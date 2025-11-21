#!/usr/bin/env python3
"""
Test Orchestrator - Docker'sız E2E Test Runner
Backend ve Frontend'i başlatır, testleri çalıştırır, temizler.
Loguru ile proper logging.
"""

import asyncio
import os
import sys
import signal
import socket
import subprocess
import time
from pathlib import Path
from typing import Dict, List, Optional
from dataclasses import dataclass

import click
import aiohttp
from loguru import logger

# Loguru konfigürasyonu
logger.remove()  # Default handler'ı kaldır
logger.add(
    sys.stderr,
    format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <level>{message}</level>",
    colorize=True,
    level="INFO"
)

@dataclass
class ServiceConfig:
    """Servis konfigürasyonu"""
    name: str
    command: str
    port: int
    cwd: str
    env: Dict[str, str]
    health_check_url: Optional[str] = None
    startup_timeout: int = 30

class Orchestrator:
    """Ana test orchestrator sınıfı"""

    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.processes: List[subprocess.Popen] = []
        # Project root'u bul
        self.project_root = Path(__file__).parent.parent.parent
        self.test_db_path = (self.project_root / "src/backend/test_db.sqlite3").absolute()

        # Graceful shutdown için signal handler
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

    def _signal_handler(self, signum, frame):
        """Ctrl+C ile temiz kapanma"""
        logger.warning("⚠️  Interrupt received, cleaning up...")
        self.cleanup()
        sys.exit(0)

    def is_port_open(self, port: int, host: str = 'localhost') -> bool:
        """Port'un açık olup olmadığını kontrol et"""
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        try:
            result = sock.connect_ex((host, port))
            sock.close()
            return result == 0
        except:
            return False

    async def wait_for_port(self, port: int, timeout: int = 30) -> bool:
        """Port açılana kadar bekle (async)"""
        start_time = time.time()
        logger.debug(f"Waiting for port {port}...")

        while time.time() - start_time < timeout:
            if self.is_port_open(port):
                logger.success(f"✓ Port {port} is open")
                return True
            await asyncio.sleep(1)

        logger.error(f"✗ Port {port} failed to open within {timeout}s")
        return False

    async def wait_for_health(self, url: str, timeout: int = 30) -> bool:
        """Health endpoint'ini kontrol et"""
        start_time = time.time()

        async with aiohttp.ClientSession() as session:
            while time.time() - start_time < timeout:
                try:
                    async with session.get(url, timeout=2) as response:
                        if response.status == 200:
                            return True
                except:
                    pass
                await asyncio.sleep(1)

        return False

    def setup_test_database(self):
        """Test database'ini hazırla"""
        logger.info("📦 Setting up test database...")

        # Eski test DB'yi temizle
        if self.test_db_path.exists():
            self.test_db_path.unlink()

        # Migration'ları çalıştır
        env = os.environ.copy()
        env.update({
            'DATABASE_URL': f'sqlite:///{self.test_db_path.absolute()}',
            'DJANGO_SECRET_KEY': 'test-secret-key-for-testing',
            'DJANGO_DEBUG': 'True',
        })

        result = subprocess.run(
            ['uv', 'run', 'python', 'manage.py', 'migrate', '--noinput'],
            cwd=str(self.project_root / 'src/backend'),
            env=env,
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            logger.error(f"❌ Migration failed: {result.stderr}")
            raise RuntimeError("Database setup failed")

        logger.success("✅ Test database ready")

    async def start_service(self, config: ServiceConfig) -> subprocess.Popen:
        """Servisi başlat"""
        logger.info(f"🚀 Starting {config.name}...")

        env = os.environ.copy()
        env.update(config.env)

        # Process'i başlat
        if self.verbose:
            process = subprocess.Popen(
                config.command,
                shell=True,
                cwd=config.cwd,
                env=env
            )
        else:
            process = subprocess.Popen(
                config.command,
                shell=True,
                cwd=config.cwd,
                env=env,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )

        self.processes.append(process)

        # Port'un açılmasını bekle
        port_ready = await self.wait_for_port(config.port, config.startup_timeout)

        if not port_ready:
            logger.error(f"❌ {config.name} failed to start on port {config.port}")
            raise RuntimeError(f"{config.name} startup failed")

        # Health check varsa kontrol et
        if config.health_check_url:
            health_ok = await self.wait_for_health(
                config.health_check_url,
                config.startup_timeout
            )
            if not health_ok:
                logger.warning(f"⚠️  {config.name} health check failed")

        logger.success(f"✅ {config.name} running on port {config.port}")
        return process

    async def run_tests(self, test_type: str = "e2e"):
        """Testleri çalıştır"""
        logger.info(f"🧪 Running {test_type} tests...")

        test_commands = {
            "e2e": "npx playwright test",
            "unit": f"cd {self.project_root / 'src/backend'} && uv run pytest -v",
            "frontend": f"cd {self.project_root / 'src/frontend'} && npm test",
            "integration": "npx playwright test --grep @integration",
            "python-e2e": f"cd {self.project_root / 'src/tests'} && uv run pytest step_defs/ -v",
        }

        command = test_commands.get(test_type, test_commands["e2e"])

        env = os.environ.copy()
        env.update({
            'FRONTEND_URL': 'http://localhost:3000',
            'BACKEND_URL': 'http://localhost:8000',
            'CI': 'true' if not self.verbose else '',
        })

        # Add --headed flag for browser tests
        if test_type in ["e2e", "integration", "python-e2e"] and self.verbose:
            command += " --headed"

        result = subprocess.run(
            command,
            shell=True,
            env=env,
            capture_output=not self.verbose,
            text=True
        )

        return result.returncode == 0

    def cleanup(self):
        """Temizlik işlemleri"""
        logger.info("🧹 Cleaning up...")

        # Process'leri kapat
        for process in self.processes:
            if process.poll() is None:  # Hala çalışıyorsa
                process.terminate()
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()

        # Test database'ini sil
        if self.test_db_path.exists():
            self.test_db_path.unlink()
            if self.verbose:
                logger.debug("Test database removed")

        logger.success("✅ Cleanup completed")

    async def orchestrate(self, test_type: str = "e2e", keep_alive: bool = False):
        """Ana orchestration fonksiyonu"""
        try:
            # Başlık
            logger.info("=" * 60)
            logger.info("🎭 Test Orchestrator - Docker-free testing environment")
            logger.info("=" * 60)

            # 1. Test database hazırla
            self.setup_test_database()

            # 2. Backend'i başlat
            backend_config = ServiceConfig(
                name="Django Backend",
                command="uv run python manage.py runserver",
                port=8000,
                cwd=str(self.project_root / "src/backend"),
                env={
                    'DATABASE_URL': f'sqlite:///{self.test_db_path.absolute()}',
                    'DJANGO_SECRET_KEY': 'test-secret-key',
                    'DJANGO_DEBUG': 'True',
                    'DJANGO_ALLOWED_HOSTS': '*',
                },
                health_check_url="http://localhost:8000/api/health/"
            )
            await self.start_service(backend_config)

            # 3. Frontend'i başlat
            frontend_config = ServiceConfig(
                name="Next.js Frontend",
                command="npm run dev",
                port=3000,
                cwd=str(self.project_root / "src/frontend"),
                env={
                    'NEXT_PUBLIC_API_BASE_URL': 'http://localhost:8000',
                    'NODE_ENV': 'test',
                }
            )
            await self.start_service(frontend_config)

            logger.info("-" * 60)
            logger.info("📊 Services Status:")
            logger.info("   • Django Backend  -> http://localhost:8000")
            logger.info("   • Next.js Frontend -> http://localhost:3000")
            logger.info("-" * 60)

            # 4. Testleri çalıştır
            test_passed = await self.run_tests(test_type)

            if test_passed:
                logger.success("✅ All tests passed!")
            else:
                logger.error("❌ Some tests failed!")
                if not keep_alive:
                    sys.exit(1)

            # Keep-alive modu
            if keep_alive:
                logger.info("🔄 Keep-alive mode - Press Ctrl+C to stop")
                logger.info("   Frontend: http://localhost:3000")
                logger.info("   Backend:  http://localhost:8000")
                await asyncio.Event().wait()  # Sonsuza kadar bekle

        except Exception as e:
            logger.error(f"❌ Orchestration failed: {e}")
            sys.exit(1)
        finally:
            if not keep_alive:
                self.cleanup()

@click.command()
@click.option(
    '--type', '-t',
    type=click.Choice(['e2e', 'unit', 'frontend', 'integration', 'python-e2e', 'all']),
    default='e2e',
    help='Type of tests to run'
)
@click.option(
    '--verbose', '-v',
    is_flag=True,
    help='Show verbose output'
)
@click.option(
    '--keep-alive', '-k',
    is_flag=True,
    help='Keep services running after tests'
)
@click.option(
    '--debug', '-d',
    is_flag=True,
    help='Enable debug logging'
)
def main(type, verbose, keep_alive, debug):
    """
    Test Orchestrator for PackedLink

    \b
    Examples:
      orchestrate --type e2e
      orchestrate --type unit --verbose
      orchestrate --keep-alive --debug
    """
    # Debug mode için logging seviyesini ayarla
    if debug or verbose:
        logger.remove()
        logger.add(
            sys.stderr,
            format="<green>{time:HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
            colorize=True,
            level="DEBUG"
        )
        logger.debug("Debug mode enabled")

    orchestrator = Orchestrator(verbose=verbose)

    # Async loop'u başlat
    try:
        asyncio.run(orchestrator.orchestrate(
            test_type=type,
            keep_alive=keep_alive
        ))
    except KeyboardInterrupt:
        logger.warning("Interrupted by user")
        sys.exit(0)

if __name__ == "__main__":
    main()

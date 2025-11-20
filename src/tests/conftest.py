"""
Shared pytest fixtures ve configuration
BDD testleri için ortak ayarlar
"""

import pytest
import re
from pathlib import Path
from playwright.sync_api import Playwright, Browser, BrowserContext, Page


@pytest.fixture(scope="function")
def authenticated_page(page: Page) -> Page:
    """Authenticated page fixture (ileride kullanılabilir)"""
    # Login logic buraya eklenebilir
    return page


# Test markers
def pytest_configure(config):
    """Custom test markers tanımla"""
    config.addinivalue_line(
        "markers", "mobile: Mobile viewport testleri"
    )
    config.addinivalue_line(
        "markers", "slow: Yavaş çalışan testler"
    )
    config.addinivalue_line(
        "markers", "integration: Integration testleri"
    )


# BDD report generation
def pytest_bdd_after_scenario(request, feature, scenario):
    """Her senaryo sonrası screenshot al (fail durumunda)"""
    # Check if rep_call attribute exists before accessing
    if hasattr(request.node, 'rep_call') and request.node.rep_call.failed:
        try:
            page = request.getfixturevalue("page")
            screenshot_dir = Path("test-results/screenshots")
            screenshot_dir.mkdir(parents=True, exist_ok=True)

            screenshot_path = screenshot_dir / f"{scenario.name}.png"
            page.screenshot(path=str(screenshot_path))
            print(f"Screenshot saved: {screenshot_path}")
        except Exception as e:
            print(f"Failed to capture screenshot: {e}")


# Hook for test reporting
@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Test sonuçlarını raporla"""
    outcome = yield
    rep = outcome.get_result()

    # rep_call attribute'unu ekle (BDD için)
    if "request" in item.fixturenames:
        request = item.funcargs["request"]
        setattr(request.node, f"rep_{rep.when}", rep)


# Global regex patterns (BDD steps için)
pytest.register_assert_rewrite("step_defs")


# Test data fixtures
@pytest.fixture
def sample_list_data():
    """Örnek liste verisi"""
    return {
        "title": "Test Listesi",
        "description": "Bu bir test listesidir",
        "curator_name": "Test Küratör",
        "curator_email": "test@example.com"
    }


@pytest.fixture
def sample_link_data():
    """Örnek link verisi"""
    return {
        "title": "Example Link",
        "url": "https://example.com",
        "notes": "Bu bir örnek linktir"
    }
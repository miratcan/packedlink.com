"""Minimal fallback for django-environ when dependency is missing."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


class Env:
    def __init__(self, **schema: Any) -> None:
        self.schema = schema

    def __call__(self, key: str, default: Any | None = None) -> Any:
        return os.environ.get(key, default)

    @staticmethod
    def read_env(path: str | Path) -> None:
        env_path = Path(path)
        if not env_path.exists():
            return
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' not in line:
                continue
            key, value = line.split('=', 1)
            os.environ.setdefault(key.strip(), value.strip())

    def bool(self, key: str, default: bool = False) -> bool:
        raw = os.environ.get(key)
        if raw is None:
            return default
        return raw.strip().lower() in {'1', 'true', 'on', 'yes'}

    def list(self, key: str, default: list[str] | None = None) -> list[str]:
        raw = os.environ.get(key)
        if raw is None:
            return default or []
        return [item.strip() for item in raw.split(',') if item.strip()]

    def db(self, key: str, default: str | None = None) -> dict[str, Any]:
        url = os.environ.get(key, default)
        if not url:
            raise ValueError(f"Env var {key} missing")
        return self._parse_db_url(url)

    def _parse_db_url(self, url: str) -> dict[str, Any]:
        parsed = urlparse(url)
        if parsed.scheme.startswith('sqlite'):
            name = parsed.path or ':memory:'
            return {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': name[1:] if name.startswith('/') else name,
            }
        if parsed.scheme in {'postgres', 'postgresql'}:
            return {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': parsed.path[1:],
                'USER': parsed.username or '',
                'PASSWORD': parsed.password or '',
                'HOST': parsed.hostname or '',
                'PORT': parsed.port or '',
            }
        if parsed.scheme in {'mysql'}:
            return {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': parsed.path[1:],
                'USER': parsed.username or '',
                'PASSWORD': parsed.password or '',
                'HOST': parsed.hostname or '',
                'PORT': parsed.port or '',
            }
        raise ValueError(f"Unsupported database url: {url}")

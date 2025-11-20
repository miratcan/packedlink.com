from __future__ import annotations

import logging
from typing import Any

from django.conf import settings

try:
    from posthog import Posthog
except Exception:  # pragma: no cover
    Posthog = None  # type: ignore

logger = logging.getLogger(__name__)
_posthog_client: Posthog | None = None


def _get_client() -> Posthog | None:
    global _posthog_client
    if not settings.POSTHOG_CAPTURE_ENABLED:
        return None
    if Posthog is None:
        return None
    if _posthog_client is None:
        _posthog_client = Posthog(
            project_api_key=settings.POSTHOG_PROJECT_API_KEY,
            host=settings.POSTHOG_HOST,
        )
    return _posthog_client


def capture_list_event(*, event: str, list_obj, properties: dict[str, Any] | None = None) -> None:
    client = _get_client()
    if not client:
        return
    payload = {"source": "django_backend", **(properties or {})}
    try:
        client.capture(distinct_id=list_obj.hash_id, event=event, properties=payload)
    except Exception as exc:  # pragma: no cover
        logger.warning("PostHog capture failed: %s", exc)

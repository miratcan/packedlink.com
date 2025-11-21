from __future__ import annotations

from datetime import timedelta
from typing import Any

import shortuuid
from django.core.exceptions import PermissionDenied
from django.db import models
from django.utils import timezone

from .posthog import capture_list_event


class ListQuerySet(models.QuerySet["List"]):
    def published(self) -> "ListQuerySet":
        return self.filter(status=List.Status.PUBLISHED)

    def active(self) -> "ListQuerySet":
        return self.exclude(status=List.Status.EXPIRED)

    def expired(self) -> "ListQuerySet":
        return self.filter(status=List.Status.EXPIRED)


class List(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        EXPIRED = "expired", "Expired"

    SESSION_KEY = "lists.manage_tokens"
    DEFAULT_LIFESPAN_DAYS = 30

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    curator_name = models.CharField(max_length=120, blank=True)
    curator_email = models.EmailField(blank=True)
    hash_id = models.CharField(max_length=24, unique=True, editable=False)
    manage_token = models.CharField(max_length=36, unique=True, editable=False)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )
    lifespan_days = models.PositiveSmallIntegerField(default=DEFAULT_LIFESPAN_DAYS)
    published_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    expired_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ListQuerySet.as_manager()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.title} ({self.hash_id})"

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.hash_id:
            self.hash_id = shortuuid.ShortUUID().random(length=10)
        if not self.manage_token:
            self.manage_token = shortuuid.uuid()
        super().save(*args, **kwargs)

    @property
    def link_count(self) -> int:
        return self.links.count()

    def publish(self) -> bool:
        if self.status == self.Status.PUBLISHED:
            return False
        now = timezone.now()
        self.status = self.Status.PUBLISHED
        if not self.published_at:
            self.published_at = now
        self.expires_at = now + timedelta(days=self.lifespan_days)
        self.save(update_fields=[
            "status",
            "published_at",
            "expires_at",
            "updated_at",
        ])
        ListEvent.log(
            list_obj=self,
            event_type=ListEvent.EventType.PUBLISHED,
            metadata={"link_count": self.link_count},
        )
        return True

    def mark_expired_if_needed(self) -> bool:
        if self.status != self.Status.PUBLISHED:
            return False
        if not self.expires_at:
            return False
        if timezone.now() < self.expires_at:
            return False
        self.status = self.Status.EXPIRED
        self.expired_at = timezone.now()
        self.save(update_fields=["status", "expired_at", "updated_at"])
        ListEvent.log(
            list_obj=self,
            event_type=ListEvent.EventType.EXPIRED,
            metadata={"expired_at": self.expired_at.isoformat()},
        )
        return True

    def has_session_access(self, session: Any) -> bool:
        tokens = set(session.get(self.SESSION_KEY, []))
        return self.manage_token in tokens

    def grant_session_access(self, session: Any) -> None:
        tokens = set(session.get(self.SESSION_KEY, []))
        tokens.add(self.manage_token)
        session[self.SESSION_KEY] = list(tokens)
        session.modified = True

    def require_session_access(self, session: Any) -> None:
        if not self.has_session_access(session):
            raise PermissionDenied("Bu liste için düzenleme iznin yok.")


class Link(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="links")
    title = models.CharField(max_length=200)
    url = models.URLField()
    notes = models.TextField(blank=True)
    position = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["position", "created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return self.title

    def save(self, *args: Any, **kwargs: Any) -> None:
        if not self.position:
            max_position = self.list.links.aggregate(models.Max("position")).get("position__max") or 0
            self.position = max_position + 1
        super().save(*args, **kwargs)


class ListEvent(models.Model):
    class EventType(models.TextChoices):
        CREATED = "list_created", "List Created"
        LINK_ADDED = "link_added", "Link Added"
        PUBLISHED = "list_published", "List Published"
        EXPIRED = "list_expired", "List Expired"

    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="events")
    event_type = models.CharField(max_length=64, choices=EventType.choices)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.event_type} @ {self.created_at:%Y-%m-%d %H:%M}"

    @classmethod
    def log(
        cls,
        *,
        list_obj: List,
        event_type: str,
        metadata: dict[str, Any] | None = None,
    ) -> "ListEvent":
        metadata = metadata or {}
        event = cls.objects.create(
            list=list_obj,
            event_type=event_type,
            metadata=metadata,
        )
        capture_list_event(
            event=event_type,
            list_obj=list_obj,
            properties={
                **metadata,
                "list_id": list_obj.hash_id,
                "link_count": list_obj.link_count,
                "status": list_obj.status,
            },
        )
        return event

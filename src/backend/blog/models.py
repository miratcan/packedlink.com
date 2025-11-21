from __future__ import annotations

from typing import Optional, Type

from django.db import models
from django.utils import timezone
from django.utils.text import slugify


def generate_unique_slug(
    model: Type[models.Model],
    value: str,
    *,
    default_slug: str,
    exclude_id: Optional[int] = None,
) -> str:
    base_slug = slugify(value) or default_slug
    slug = base_slug
    counter = 2
    queryset = model.objects.all()
    if exclude_id:
        queryset = queryset.exclude(pk=exclude_id)
    while queryset.filter(slug=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:  # pragma: no cover
        return self.name

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = generate_unique_slug(
                Tag,
                self.name or "tag",
                default_slug="tag",
                exclude_id=self.pk,
            )
        super().save(*args, **kwargs)


class BlogPostQuerySet(models.QuerySet["BlogPost"]):
    def published(self) -> "BlogPostQuerySet":
        now = timezone.now()
        return self.filter(
            is_published=True,
            published_at__isnull=False,
            published_at__lte=now,
        )


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField(help_text="Markdown content")
    excerpt = models.TextField(blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)

    objects = BlogPostQuerySet.as_manager()

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self) -> str:  # pragma: no cover
        return self.title

    def save(self, *args, **kwargs) -> None:
        if not self.slug:
            self.slug = generate_unique_slug(
                BlogPost,
                self.title or "post",
                default_slug="post",
                exclude_id=self.pk,
            )
        if self.is_published and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)


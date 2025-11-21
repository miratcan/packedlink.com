from __future__ import annotations

from ninja import ModelSchema

from .models import BlogPost, Tag


class TagSchema(ModelSchema):
    class Meta:
        model = Tag
        fields = ["name", "slug"]


class BlogPostSchema(ModelSchema):
    tags: list[TagSchema]

    class Meta:
        model = BlogPost
        fields = [
            "title",
            "slug",
            "content",
            "excerpt",
            "published_at",
            "is_published",
        ]

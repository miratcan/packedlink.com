from datetime import timedelta

import pytest
from django.utils import timezone

from blog.models import BlogPost, Tag


@pytest.mark.django_db
def test_blog_list_api_returns_published_posts_only(client):
    tag = Tag.objects.create(name="Backend")
    older = BlogPost.objects.create(
        title="Older",
        content="Old content",
        is_published=True,
        published_at=timezone.now() - timedelta(days=1),
    )
    older.tags.add(tag)
    newest = BlogPost.objects.create(
        title="Newest",
        content="Fresh content",
        is_published=True,
        published_at=timezone.now(),
    )
    draft = BlogPost.objects.create(title="Draft", content="Draft content", is_published=False)

    response = client.get("/api/v1/blog/")

    assert response.status_code == 200
    payload = response.json()
    assert payload["count"] == 2
    returned_slugs = [item["slug"] for item in payload["items"]]
    assert returned_slugs == [newest.slug, older.slug]
    assert draft.slug not in returned_slugs


@pytest.mark.django_db
def test_blog_detail_api_includes_tags(client):
    tag = Tag.objects.create(name="Python")
    post = BlogPost.objects.create(
        title="Django Ninja Intro",
        content="Content",
        is_published=True,
        published_at=timezone.now(),
    )
    post.tags.add(tag)
    draft = BlogPost.objects.create(
        title="Unpublished",
        content="Hidden",
        is_published=False,
    )

    response = client.get(f"/api/v1/blog/{post.slug}/")
    assert response.status_code == 200
    payload = response.json()
    assert payload["title"] == post.title
    assert payload["tags"] == [{"name": "Python", "slug": "python"}]

    draft_response = client.get(f"/api/v1/blog/{draft.slug}/")
    assert draft_response.status_code == 404

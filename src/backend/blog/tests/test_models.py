from datetime import timedelta

import pytest
from django.utils import timezone

from blog.models import BlogPost, Tag


@pytest.mark.django_db
def test_slug_and_published_at_autofill():
    now = timezone.now()
    post = BlogPost.objects.create(
        title="My First Post",
        content="Hello world",
        is_published=True,
    )

    assert post.slug == "my-first-post"
    assert post.published_at is not None
    assert abs((post.published_at - now).total_seconds()) < 5


@pytest.mark.django_db
def test_unique_slug_generation_increments():
    first = BlogPost.objects.create(title="Same Title", content="one")
    second = BlogPost.objects.create(title="Same Title", content="two")

    assert first.slug == "same-title"
    assert second.slug == "same-title-2"


@pytest.mark.django_db
def test_published_manager_filters_and_orders():
    tag = Tag.objects.create(name="Django")
    published_old = BlogPost.objects.create(
        title="Old Post",
        content="old",
        is_published=True,
        published_at=timezone.now() - timedelta(days=3),
    )
    published_old.tags.add(tag)
    published_new = BlogPost.objects.create(
        title="New Post",
        content="new",
        is_published=True,
        published_at=timezone.now(),
    )
    draft = BlogPost.objects.create(title="Draft", content="draft", is_published=False)
    future = BlogPost.objects.create(
        title="Future Post",
        content="future",
        is_published=True,
        published_at=timezone.now() + timedelta(days=2),
    )

    published = list(BlogPost.objects.published())

    assert published == [published_new, published_old]
    assert draft not in published
    assert future not in published

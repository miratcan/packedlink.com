from __future__ import annotations

from django.shortcuts import get_object_or_404
from ninja import Router
from ninja.pagination import PageNumberPagination, paginate

from .models import BlogPost
from .schemas import BlogPostSchema

router = Router(tags=["blog"])


class BlogPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 50


@router.get("/", response=list[BlogPostSchema])
@paginate(BlogPagination)
def list_posts(request):
    return BlogPost.objects.published().prefetch_related("tags")


@router.get("/{slug}/", response=BlogPostSchema)
def get_post(request, slug: str):
    return get_object_or_404(
        BlogPost.objects.published().prefetch_related("tags"),
        slug=slug,
    )


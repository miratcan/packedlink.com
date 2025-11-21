from django.contrib import admin
from django.utils.safestring import mark_safe
from markdown2 import markdown

from .models import BlogPost, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


class BlogPostTagInline(admin.TabularInline):
    model = BlogPost.tags.through
    extra = 1
    autocomplete_fields = ("tag",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "published_at", "is_published")
    search_fields = ("title", "content")
    list_filter = ("is_published", "tags", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [BlogPostTagInline]
    exclude = ("tags",)
    readonly_fields = ("markdown_preview", "created_at", "updated_at")
    date_hierarchy = "published_at"
    ordering = ("-published_at", "-created_at")

    def markdown_preview(self, obj: BlogPost) -> str:
        if not getattr(obj, "content", None):
            return "—"
        return mark_safe(markdown(obj.content, extras=["fenced-code-blocks", "tables"]))

    markdown_preview.short_description = "Markdown Preview"


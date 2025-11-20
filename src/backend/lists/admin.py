from django.contrib import admin

from .models import Link, List, ListEvent


@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    list_display = ("title", "hash_id", "status", "link_count", "published_at")
    readonly_fields = ("hash_id", "manage_token", "published_at", "expires_at", "expired_at")
    search_fields = ("title", "hash_id", "curator_name")
    list_filter = ("status",)


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ("title", "list", "position")
    search_fields = ("title", "url")


@admin.register(ListEvent)
class ListEventAdmin(admin.ModelAdmin):
    list_display = ("event_type", "list", "created_at")
    readonly_fields = ("created_at", "metadata")
    list_filter = ("event_type",)

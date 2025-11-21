from datetime import timedelta

import pytest
from django.core.management import call_command
from django.test import Client
from django.urls import reverse
from django.utils import timezone

from lists.models import Link, List, ListEvent


@pytest.mark.django_db
def test_publish_flow_creates_public_list(client: Client):
    response = client.post(
        reverse("lists:start"),
        data={
            "title": "Haftalık AI Radar",
            "description": "Son 7 günün en iyi AI linkleri",
            "curator_name": "Mira",
            "curator_email": "mira@example.com",
        },
    )
    assert response.status_code == 302
    list_obj = List.objects.get(title="Haftalık AI Radar")

    add_link_response = client.post(
        reverse("lists:builder", kwargs={"manage_token": list_obj.manage_token}),
        data={
            "action": "add_link",
            "title": "OpenAI blog",
            "url": "https://openai.com/blog",
            "notes": "GPT-5 yenilikleri",
        },
    )
    assert add_link_response.status_code == 302

    list_obj.refresh_from_db()
    assert list_obj.link_count == 1

    publish_response = client.post(
        reverse("lists:publish", kwargs={"manage_token": list_obj.manage_token}),
    )
    assert publish_response.status_code == 302

    list_obj.refresh_from_db()
    assert list_obj.status == List.Status.PUBLISHED

    success_response = client.get(
        reverse("lists:publish-success", kwargs={"manage_token": list_obj.manage_token})
    )
    assert success_response.status_code == 200
    assert b"Public URL" in success_response.content

    public_response = client.get(
        reverse("lists:public-detail", kwargs={"hash_id": list_obj.hash_id})
    )
    assert public_response.status_code == 200
    assert b"OpenAI blog" in public_response.content

    # created + link_added + list_published
    assert ListEvent.objects.filter(list=list_obj).count() == 3


@pytest.mark.django_db
def test_manage_link_grants_session_access(client: Client):
    list_obj = List.objects.create(title="Deneme", description="", curator_name="Ada")
    Link.objects.create(list=list_obj, title="PackedLink", url="https://packedlink.com")

    builder_url = reverse("lists:builder", kwargs={"manage_token": list_obj.manage_token})
    first_response = client.get(f"{builder_url}?auth={list_obj.manage_token}")
    assert first_response.status_code == 302

    follow_response = client.get(builder_url)
    assert follow_response.status_code == 200
    assert b"Linkler" in follow_response.content


@pytest.mark.django_db
def test_expire_management_command_marks_old_lists():
    list_obj = List.objects.create(title="Süreli Liste", description="")
    Link.objects.create(list=list_obj, title="Repo", url="https://example.com")
    list_obj.publish()
    list_obj.expires_at = timezone.now() - timedelta(days=1)
    list_obj.save(update_fields=["expires_at"])

    call_command("expire_lists")

    list_obj.refresh_from_db()
    assert list_obj.status == List.Status.EXPIRED
    assert ListEvent.objects.filter(
        list=list_obj, event_type=ListEvent.EventType.EXPIRED
    ).exists()

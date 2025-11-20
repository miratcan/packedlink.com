from django.urls import path

from . import views

app_name = "lists"

urlpatterns = [
    path("", views.StartListView.as_view(), name="start"),
    path("manage/<str:manage_token>/builder/", views.ListBuilderView.as_view(), name="builder"),
    path("manage/<str:manage_token>/publish/", views.ListPublishView.as_view(), name="publish"),
    path("manage/<str:manage_token>/published/", views.PublishSuccessView.as_view(), name="publish-success"),
    path("l/<str:hash_id>/", views.PublicListView.as_view(), name="public-detail"),
]

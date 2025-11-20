from __future__ import annotations

from typing import Any

from django.contrib import messages
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse, reverse_lazy
from django.utils.http import urlencode
from django.views.generic import FormView, TemplateView
from django.views import View

from .forms import LinkForm, ListStartForm, ListUpdateForm
from .models import List


class HealthCheckView(View):
    """Simple health check endpoint for testing"""
    def get(self, request):
        return JsonResponse({'status': 'healthy', 'service': 'backend'})


class ManageTokenRequiredMixin:
    list_kwarg_name = "manage_token"

    def dispatch(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        manage_token = kwargs.get(self.list_kwarg_name)
        self.list_obj = get_object_or_404(List, manage_token=manage_token)
        auth_token = request.GET.get("auth")
        if auth_token == manage_token:
            self.list_obj.grant_session_access(request.session)
            clean_url = request.path
            other_params = request.GET.copy()
            if "auth" in other_params:
                other_params.pop("auth")
            if other_params:
                clean_url = f"{clean_url}?{urlencode(other_params, doseq=True)}"
            return redirect(clean_url)
        if not self.list_obj.has_session_access(request.session):
            messages.error(request, "Bu yönetim linkine erişim iznin yok. Lütfen start formundan yeni liste oluştur.")
            return redirect("lists:start")
        return super().dispatch(request, *args, **kwargs)


class StartListView(FormView):
    template_name = "lists/start.html"
    form_class = ListStartForm
    success_url = reverse_lazy("lists:start")

    def form_valid(self, form: ListStartForm) -> HttpResponse:
        list_obj = form.save()
        list_obj.grant_session_access(self.request.session)
        messages.success(self.request, "Liste taslağın hazır. Şimdi link ekleyebilirsin.")
        return redirect("lists:builder", manage_token=list_obj.manage_token)


class ListBuilderView(ManageTokenRequiredMixin, TemplateView):
    template_name = "lists/builder.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        ctx = super().get_context_data(**kwargs)
        ctx.update(
            {
                "list_obj": self.list_obj,
                "links": self.list_obj.links.all(),
                "list_form": ListUpdateForm(instance=self.list_obj),
                "link_form": LinkForm(),
                "can_publish": self.list_obj.link_count > 0,
            }
        )
        return ctx

    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        action = request.POST.get("action")
        if action == "update_list":
            form = ListUpdateForm(request.POST, instance=self.list_obj)
            if form.is_valid():
                form.save()
                messages.success(request, "Liste detayları güncellendi.")
            else:
                messages.error(request, "Lütfen form hatalarını düzelt.")
            return self.render_to_response(
                {
                    "list_obj": self.list_obj,
                    "links": self.list_obj.links.all(),
                    "list_form": form,
                    "link_form": LinkForm(),
                    "can_publish": self.list_obj.link_count > 0,
                }
            )

        if action == "add_link":
            link_form = LinkForm(request.POST)
            if link_form.is_valid():
                link_form.save(list_obj=self.list_obj)
                messages.success(request, "Link listenine eklendi.")
                return redirect("lists:builder", manage_token=self.list_obj.manage_token)
            messages.error(request, "Link eklenemedi. Formu kontrol et.")
            return self.render_to_response(
                {
                    "list_obj": self.list_obj,
                    "links": self.list_obj.links.all(),
                    "list_form": ListUpdateForm(instance=self.list_obj),
                    "link_form": link_form,
                    "can_publish": self.list_obj.link_count > 0,
                }
            )

        if action == "delete_link":
            link_id = request.POST.get("link_id")
            deleted, _ = self.list_obj.links.filter(pk=link_id).delete()
            if deleted:
                messages.success(request, "Link kaldırıldı.")
            else:
                messages.error(request, "Silmek istediğin link bulunamadı.")
            return redirect("lists:builder", manage_token=self.list_obj.manage_token)

        messages.info(request, "Bir aksiyon seçilmedi.")
        return redirect("lists:builder", manage_token=self.list_obj.manage_token)


class ListPublishView(ManageTokenRequiredMixin, TemplateView):
    template_name = "lists/publish.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        ctx = super().get_context_data(**kwargs)
        ctx.update({"list_obj": self.list_obj, "links": self.list_obj.links.all()})
        return ctx

    def post(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        if self.list_obj.link_count == 0:
            messages.error(request, "Public hale getirmeden önce en az bir link eklemelisin.")
            return redirect("lists:builder", manage_token=self.list_obj.manage_token)
        if self.list_obj.publish():
            messages.success(request, "Liste public hale geldi.")
        return redirect("lists:publish-success", manage_token=self.list_obj.manage_token)


class PublishSuccessView(ManageTokenRequiredMixin, TemplateView):
    template_name = "lists/publish_success.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        ctx = super().get_context_data(**kwargs)
        request: HttpRequest = self.request
        ctx.update(
            {
                "list_obj": self.list_obj,
                "public_url": request.build_absolute_uri(self.list_obj.public_path),
                "manage_url": request.build_absolute_uri(self.list_obj.management_share_path),
            }
        )
        return ctx


class PublicListView(TemplateView):
    template_name = "lists/public_detail.html"

    def dispatch(self, request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
        self.list_obj = get_object_or_404(List, hash_id=kwargs.get("hash_id"))
        if self.list_obj.status == List.Status.DRAFT:
            messages.error(request, "Bu liste henüz yayınlanmadı.")
            return redirect("lists:start")
        self.list_obj.mark_expired_if_needed()
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        ctx = super().get_context_data(**kwargs)
        ctx.update({"list_obj": self.list_obj, "links": self.list_obj.links.all()})
        return ctx

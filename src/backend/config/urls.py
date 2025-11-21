"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

from config.api import api, api_config
from lists.views import HealthCheckView

api_prefix = api_config.prefix.rstrip("/")

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{api_prefix}/health/', HealthCheckView.as_view(), name='health-check'),
    path(f'{api_prefix}/docs/', RedirectView.as_view(url=f'/{api_prefix}/docs', permanent=False)),
    path(f'{api_prefix}/', api.urls),
]

from django.http import JsonResponse
from django.views import View


class HealthCheckView(View):
    """Simple health check endpoint for testing."""

    def get(self, request):
        return JsonResponse({'status': 'healthy', 'service': 'backend'})


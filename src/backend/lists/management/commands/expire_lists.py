from django.core.management.base import BaseCommand

from lists.models import List


class Command(BaseCommand):
    help = "Expire olmuş listeleri işaretler"

    def handle(self, *args, **options):
        expired_count = 0
        for list_obj in List.objects.filter(status=List.Status.PUBLISHED):
            if list_obj.mark_expired_if_needed():
                expired_count += 1
        self.stdout.write(
            self.style.SUCCESS(f"Kontrol tamamlandı. Expire edilen liste sayısı: {expired_count}")
        )

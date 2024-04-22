from django.contrib import admin
from django.http import JsonResponse
from .models import Destination
from .models import Reservation


# Register your models here.

class ReservationAdmin(admin.ModelAdmin):
    def delete_model(self, request, obj):
        try:
            destination_id = obj.destination.id
            destination = Destination.objects.get(pk=destination_id)

            reserved_dates = destination.reserved_dates
            for index, interval in enumerate(reserved_dates):
                if (interval['start_date'] == obj.start_date.strftime('%Y-%m-%d') and
                        interval['end_date'] == obj.end_date.strftime('%Y-%m-%d')):
                    del reserved_dates[index]
                    break

            destination.reserved_dates = reserved_dates
            destination.save()
        except Destination.DoesNotExist:
            pass

        obj.delete()
        return JsonResponse({'success': 'Reservation deleted successfully'})


admin.site.register(Destination)
admin.site.register(Reservation, ReservationAdmin)

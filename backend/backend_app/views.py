from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .models import Destination, Reservation
from .serializers import DestinationSerializer, ReservationSerializer
from .token_decorator import token_required
from rest_framework.response import Response


class DestinationListView(ListAPIView):
    serializer_class = DestinationSerializer
    lookup_field = 'name'

    @token_required
    def get_queryset(self):
        is_promoted = self.request.query_params.get('is_promoted', None)
        location = self.request.query_params.get('location', None)
        start_date = self.request.GET.get('start_date', None)
        end_date = self.request.GET.get('end_date', None)

        if is_promoted is not None:
            queryset = Destination.objects.filter(discount_percentage__gt=0)
        elif location is not None:
            queryset = Destination.objects.filter(location=location)
        elif start_date is not None and end_date is not None:
            queryset = Destination.objects.all()
            queryset = [
                destination for destination in queryset
                if all(
                    end_date <= interval['start_date'] or
                    start_date >= interval['end_date']
                    for interval in destination.reserved_dates
                )
            ]
        else:
            queryset = Destination.objects.all()
        return queryset


class ReservationView(APIView):
    serializer_class = ReservationSerializer

    @token_required
    def get(self, request, destination_id=None):
        if destination_id is not None:
            reservations = Reservation.objects.filter(destination__id=destination_id)
        else:
            reservations = Reservation.objects.all()

        serializer = self.serializer_class(reservations, many=True)
        return Response(serializer.data)

    @token_required
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            reservation = serializer.save()

            reservation_id = reservation.id
            saved_reservation = Reservation.objects.get(pk=reservation_id)
            destination_id = saved_reservation.destination.id
            destination = Destination.objects.get(pk=destination_id)
            interval = {
                'start_date': saved_reservation.start_date.strftime('%Y-%m-%d'),
                'end_date': saved_reservation.end_date.strftime('%Y-%m-%d'),
            }
            destination.reserved_dates.append(interval)
            destination.save()

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @token_required
    def delete(self, request, id):
        try:
            reservation = Reservation.objects.get(id=id)
            destination_id = reservation.destination.id
            destination = Destination.objects.get(pk=destination_id)

            reserved_dates = destination.reserved_dates
            for index, interval in enumerate(reserved_dates):
                if (interval['start_date'] == reservation.start_date.strftime('%Y-%m-%d') and
                        interval['end_date'] == reservation.end_date.strftime('%Y-%m-%d')):
                    del reserved_dates[index]
                    break

            destination.reserved_dates = reserved_dates

            destination.save()

        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found'}, status=404)

        reservation.delete()
        return Response({'success': 'Reservation deleted successfully'}, status=204)

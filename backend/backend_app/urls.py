from django.urls import path
from .views import DestinationListView, ReservationView

urlpatterns = [
    path('destinations/', DestinationListView.as_view(), name='destination-list'),
    path('reservations/', ReservationView.as_view(), name='reservations'),
    path('reservations/<int:destination_id>/', ReservationView.as_view(), name='reservations_for_destination'),
    path('reservation/<int:id>/', ReservationView.as_view(), name='delete_reservation')
]

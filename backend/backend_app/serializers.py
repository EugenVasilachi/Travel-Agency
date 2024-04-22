from rest_framework import serializers
from .models import Destination
from .models import Reservation


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'
        lookup_field = 'name'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def to_representation(self, instance):
        self.fields['destination'] = DestinationSerializer(read_only=True)
        return super(ReservationSerializer, self).to_representation(instance)

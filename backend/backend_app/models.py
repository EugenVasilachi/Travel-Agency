from django.db import models
import datetime

# Create your models here.


class Destination(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    nr_people = models.PositiveIntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    ranking = models.FloatField()
    initial_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.FloatField(default=0)
    reserved_dates = models.JSONField(default=list, null=True)

    def __str__(self):
        return self.name


class Reservation(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.PROTECT)
    client = models.CharField(max_length=100)
    reservation_date = models.DateField(default=datetime.date.today)
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Reservation for {self.destination.name} on {self.reservation_date}'



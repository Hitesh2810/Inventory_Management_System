from django.db import models

class User(models.Model):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )

    username = models.CharField(max_length=100, unique=True)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=255)

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='user'
    )

    address_full_name = models.CharField(max_length=150, blank=True, default='')
    address_phone = models.CharField(max_length=20, blank=True, default='')
    address_line1 = models.CharField(max_length=255, blank=True, default='')
    address_line2 = models.CharField(max_length=255, blank=True, default='')
    address_city = models.CharField(max_length=100, blank=True, default='')
    address_state = models.CharField(max_length=100, blank=True, default='')
    address_country = models.CharField(max_length=100, blank=True, default='')
    address_pincode = models.CharField(max_length=20, blank=True, default='')

    def __str__(self):
        return self.username

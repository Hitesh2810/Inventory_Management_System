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

    def __str__(self):
        return self.username
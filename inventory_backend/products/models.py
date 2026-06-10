from django.db import models
from users.models import User

class Category(models.Model):
    category_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.category_name

class Product(models.Model):

    product_name = models.CharField(max_length=200)

    description = models.TextField(blank=True, null=True)

    image_url = models.URLField(blank=True, null=True)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.IntegerField(default=0)

    barcode = models.CharField(
        max_length=100,
        unique=True
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )

    supplier = models.ForeignKey(
        'suppliers.Supplier',
        on_delete=models.CASCADE,
        related_name='products'
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    #updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name

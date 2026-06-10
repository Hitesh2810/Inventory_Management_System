from django.db import models
from products.models import Product
from users.models import User

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    stock_in = models.IntegerField(default=0)
    stock_out = models.IntegerField(default=0)
    remaining_stock = models.IntegerField()

    last_updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.product_name
from django.db import models
from products.models import Product

class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity_sold = models.IntegerField()

    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    sale_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.product_name
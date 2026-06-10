from rest_framework import viewsets
from .models import Inventory
from .serializers import InventorySerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.models import Product
from orders.models import Order

@api_view(['GET'])
def dashboard_stats(request):

    total_products = Product.objects.count()
    total_orders = Order.objects.count()

    revenue = 85000

    return Response({
        "products": total_products,
        "orders": total_orders,
        "revenue": revenue
    })
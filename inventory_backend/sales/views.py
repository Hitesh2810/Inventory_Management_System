from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Sale
from .serializers import SaleSerializer

from products.models import Product


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def create(self, request, *args, **kwargs):

        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity_sold"))

        try:
            product = Product.objects.get(id=product_id)

            # CHECK STOCK
            if product.stock < quantity:
                return Response(
                    {"error": "Not enough stock available"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # REDUCE STOCK
            product.stock -= quantity
            product.save()

            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data)

            return Response(serializer.errors, status=400)

        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=404
            )
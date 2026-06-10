from decimal import Decimal

from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer

from products.models import Product
from sales.models import Sale
from users.models import User


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all().order_by("-order_date", "-id")
        username = self.request.query_params.get("username")

        if username:
            queryset = queryset.filter(user__username=username)

        return queryset

    @action(detail=False, methods=["post"], url_path="checkout")
    def checkout(self, request):
        username = request.data.get("username")
        items = request.data.get("items", [])

        if not username:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not items:
            return Response({"error": "Cart items are required"}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(
            username=username,
            defaults={
                "email": request.data.get("email") or f"{username.replace(' ', '-').lower()}@checkout.local",
                "password": "checkout-user",
                "role": "user",
            },
        )

        try:
            with transaction.atomic():
                product_ids = [item.get("product") for item in items]
                products = {
                    product.id: product
                    for product in Product.objects.select_for_update().filter(id__in=product_ids)
                }

                total_amount = Decimal("0.00")
                normalized_items = []

                for item in items:
                    product_id = int(item.get("product"))
                    quantity = int(item.get("quantity", 0))

                    if quantity < 1:
                        return Response({"error": "Quantity must be at least 1"}, status=status.HTTP_400_BAD_REQUEST)

                    product = products.get(product_id)

                    if not product:
                        return Response({"error": f"Product {product_id} not found"}, status=status.HTTP_404_NOT_FOUND)

                    if product.stock < quantity:
                        return Response(
                            {"error": f"Not enough stock available for {product.product_name}"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                    line_total = product.price * quantity
                    total_amount += line_total
                    normalized_items.append((product, quantity, product.price, line_total))

                order = Order.objects.create(
                    user=user,
                    total_amount=total_amount,
                    order_status="pending",
                    payment_status="paid",
                )

                for product, quantity, price, line_total in normalized_items:
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=quantity,
                        price=price,
                    )

                    Sale.objects.create(
                        product=product,
                        quantity_sold=quantity,
                        total_price=line_total,
                    )

                    product.stock -= quantity
                    product.save(update_fields=["stock"])

                serializer = self.get_serializer(order)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except (TypeError, ValueError):
            return Response({"error": "Invalid checkout payload"}, status=status.HTTP_400_BAD_REQUEST)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def create(self, request, *args, **kwargs):

        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity"))

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

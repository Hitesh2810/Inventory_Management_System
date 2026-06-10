from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def home(request):
    return HttpResponse("Inventory Management Backend Running Successfully 🚀")

urlpatterns = [

    path('admin/', admin.site.urls),

    path('', home),

    path('api/', include('products.urls')),
    path('api/users/', include('users.urls')),
    path('api/', include('suppliers.urls')),
    path('api/', include('inventory.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('sales.urls')),
    path('api/', include('reports.urls')),
    path('api/', include('contacts.urls')),
    

    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

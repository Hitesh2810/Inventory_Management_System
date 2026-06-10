from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['POST'])
@permission_classes([AllowAny])
def custom_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(
            username=username,
            password=password
        )

        return Response({
            "message": "Login Successful",
            "username": user.username,
            "role": user.role
        })

    except User.DoesNotExist:
        return Response(
            {"error": "Invalid Credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )
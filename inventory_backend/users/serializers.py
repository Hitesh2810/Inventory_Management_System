from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "role",
            "address_full_name",
            "address_phone",
            "address_line1",
            "address_line2",
            "address_city",
            "address_state",
            "address_country",
            "address_pincode",
        ]

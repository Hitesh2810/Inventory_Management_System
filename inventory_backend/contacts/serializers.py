from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='name', required=False, write_only=True)
    phone_number = serializers.CharField(source='phone', required=False, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ('id', 'name', 'full_name', 'email', 'phone', 'phone_number', 'subject', 'message', 'status', 'created_at')
        read_only_fields = ('status', 'created_at')

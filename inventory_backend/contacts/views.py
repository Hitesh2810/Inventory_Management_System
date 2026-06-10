from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at', '-id')
    serializer_class = ContactMessageSerializer

    @action(detail=True, methods=['patch'], url_path='mark-read')
    def mark_read(self, request, pk=None):
        message = self.get_object()
        message.status = 'read'
        message.save(update_fields=['status'])
        return Response(self.get_serializer(message).data)

    @action(detail=True, methods=['patch'], url_path='mark-unread')
    def mark_unread(self, request, pk=None):
        message = self.get_object()
        message.status = 'unread'
        message.save(update_fields=['status'])
        return Response(self.get_serializer(message).data)

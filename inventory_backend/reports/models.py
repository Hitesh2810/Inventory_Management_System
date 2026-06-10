from django.db import models
from users.models import User

class Report(models.Model):
    report_name = models.CharField(max_length=200)

    report_type = models.CharField(max_length=100)

    generated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    generated_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.report_name
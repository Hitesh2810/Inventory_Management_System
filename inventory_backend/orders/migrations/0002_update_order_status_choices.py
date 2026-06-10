from django.db import migrations, models


def rename_completed_to_delivered(apps, schema_editor):
    Order = apps.get_model('orders', 'Order')
    Order.objects.filter(order_status='completed').update(order_status='delivered')


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')], default='pending', max_length=20),
        ),
        migrations.RunPython(rename_completed_to_delivered, migrations.RunPython.noop),
    ]

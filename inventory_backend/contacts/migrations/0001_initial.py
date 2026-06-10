from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=30)),
                ('subject', models.CharField(max_length=180)),
                ('message', models.TextField()),
                ('status', models.CharField(choices=[('unread', 'Unread'), ('read', 'Read')], default='unread', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

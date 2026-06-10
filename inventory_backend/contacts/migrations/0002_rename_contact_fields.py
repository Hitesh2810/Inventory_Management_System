from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contactmessage',
            old_name='full_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='contactmessage',
            old_name='phone_number',
            new_name='phone',
        ),
    ]

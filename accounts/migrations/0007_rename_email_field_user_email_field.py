# Generated by Django 4.0.2 on 2022-06-20 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_rename_email_field_user_email_field'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='email_field',
            new_name='EMAIL_FIELD',
        ),
    ]

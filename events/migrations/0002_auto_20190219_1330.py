# Generated by Django 2.1.7 on 2019-02-19 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='title',
            new_name='name',
        ),
    ]

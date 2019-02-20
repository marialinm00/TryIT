# Generated by Django 2.1.7 on 2019-02-16 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('volunteers', '0018_auto_20190215_1828'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='volunteer',
            name='rolelist',
        ),
        migrations.AddField(
            model_name='volunteer',
            name='rolelist',
            field=models.ForeignKey(blank=True, default='assistant', on_delete=django.db.models.deletion.PROTECT, to='volunteers.VolunteerRole'),
        ),
    ]

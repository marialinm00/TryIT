# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-13 11:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0003_remove_mail_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mail',
            name='attachment',
            field=models.ManyToManyField(blank=True, to='mail.Attachment'),
        ),
    ]
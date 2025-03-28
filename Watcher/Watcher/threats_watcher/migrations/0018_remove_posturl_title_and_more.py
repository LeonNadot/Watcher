# Generated by Django 5.0.11 on 2025-03-28 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('threats_watcher', '0017_posturl_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posturl',
            name='title',
        ),
        migrations.RemoveField(
            model_name='trendyword',
            name='fiability_score',
        ),
        migrations.AddField(
            model_name='trendyword',
            name='score',
            field=models.FloatField(default=0, help_text='Average confidence score from source (1=100%, 2=50%, 3=20%)'),
        ),
    ]

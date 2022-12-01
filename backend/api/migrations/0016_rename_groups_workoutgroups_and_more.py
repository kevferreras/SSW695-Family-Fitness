# Generated by Django 4.1.3 on 2022-12-01 01:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0015_remove_groups_group_tags_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Groups',
            new_name='WorkoutGroups',
        ),
        migrations.AlterField(
            model_name='workoutgroups',
            name='member',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]

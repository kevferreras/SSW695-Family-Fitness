# Generated by Django 4.0.8 on 2022-11-20 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_merge_20221119_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='avatar_img',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
        migrations.AlterField(
            model_name='tags',
            name='tag_description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='end_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='gps_coordinates',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='start_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='total_distance',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='workout_category',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='workout_duration',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='workouts',
            name='workout_intensity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

# Generated by Django 4.0.8 on 2022-11-21 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_account_avatar_img_alter_tags_tag_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AlterField(
            model_name='account',
            name='user_name',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
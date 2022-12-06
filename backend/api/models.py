from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib import admin

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, related_name='account', on_delete=models.CASCADE)
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    email = models.EmailField(max_length = 254, null=True, blank=True)
    user_name = models.CharField(max_length = 30)
    password = models.CharField(max_length = 30)
    last_seen = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    avatar_img = models.ImageField(blank = True, null = True, upload_to="images", storage = None, width_field=None, height_field=None)
    
    def __str__(self):
        return self.first_name + " " + self.last_name

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Account.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.account.save()

class AccountAdmin(admin.ModelAdmin):
    list_display = ('user','first_name','last_name')

class Post(models.Model):
    name = models.CharField('Post',max_length=30)
    post_account = models.ForeignKey(Account, blank = True, null=True,on_delete = models.SET_NULL) 
    post = models.TextField()
    post_img = models.ImageField(upload_to="", storage = None, width_field=None, height_field=None)
    post_date = models.DateTimeField() # YYYY-MM-DD HH:MM
    post_likes = models.IntegerField()
    
    # def __str__(self):
    #     return self.name

class Comment(models.Model):
    name = models.CharField('Comment',max_length=30)
    comment_post = models.ForeignKey(Post,blank = True, null=True, on_delete = models.SET_NULL)
    comment_account = models.ForeignKey(Account, blank = True, null=True, on_delete = models.SET_NULL)
    comment = models.TextField()

    # def __str__(self):
    #     return self.name

class Photo(models.Model):
    name = models.CharField('Photo',max_length=30)
    photo_account = models.ForeignKey(Account, blank = True, null=True,on_delete = models.SET_NULL)
    photo = models.ImageField(upload_to="", storage = None, width_field=None, height_field=None)

    def __str__(self):
        return self.name

class Tags(models.Model):
    name = models.CharField('Tags',max_length=30)
    tags_account = models.ManyToManyField(Account)
    tag_description = models.TextField()

    def __str__(self):
        return self.name

class WorkOuts(models.Model):
    name = models.CharField('WorkOuts',max_length=30)
    workout_type = models.CharField(max_length=30)
    workout_category = models.CharField(max_length=30, blank = True, null = True)
    workout_intensity = models.IntegerField(blank = True, null = True)
    workout_duration = models.DurationField(blank = True, null = True)
    start_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    end_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    total_distance = models.IntegerField(blank = True, null = True)
    gps_coordinates = models.CharField(max_length=30,blank = True, null = True)
    workout_account = models.ForeignKey(User, blank = True, null=True, on_delete = models.SET_NULL)
    workout_tags = models.ManyToManyField(Tags, blank = True)

    def __str__(self):
        return self.name
        
class WorkoutsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','workout_type','workout_account')


class Groups(models.Model):
    name = models.CharField('Groups',max_length=30)
    member = models.ManyToManyField(Account)
    group_description = models.TextField(blank = True)
    #member = models.ForeignKey(Account, blank = True, null=True, on_delete = models.SET_NULL)
    group_tags = models.ManyToManyField(Tags)

    def __str__(self):
        return self.name

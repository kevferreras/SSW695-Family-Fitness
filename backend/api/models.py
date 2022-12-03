from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib import admin

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, related_name='account', on_delete=models.CASCADE)
    avatar_img = models.ImageField(blank = True, null = True, upload_to="images", storage = None, width_field=None, height_field=None)
    
    def __str__(self):
        return self.user

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Account.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.account.save()

class AccountAdmin(admin.ModelAdmin):
    list_display = (['user'])

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

class WorkOuts(models.Model):
    name = models.CharField('WorkOut Name',max_length=30) # name / description of workout
    workout_type = models.CharField(max_length=30) # type of sport (running, football, tennis, etc)
    workout_intensity = models.IntegerField(blank = True, null = True) # intensity of workout (1-5) 5 is highest
    workout_duration = models.DurationField(blank = True, null = True) 
    start_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    end_time = models.DateTimeField(blank = True, null = True) # YYYY-MM-DD HH:MM
    total_distance = models.IntegerField(blank = True, null = True) # distance in miles
    gps_coordinates = models.CharField(max_length=1000, blank = True, null = True) # list of gps coordinates
    workout_account = models.ForeignKey(User, blank = True, null=True, on_delete = models.SET_NULL) # user account
    
    def __str__(self):
        return self.name
        
class WorkoutsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','workout_type','workout_account')

class WorkoutGroups(models.Model):
    name = models.CharField('Groups',max_length=30) 
    #member = models.ManyToManyField(Account)
    member = models.ManyToManyField(User, blank = True)
    group_description = models.TextField(blank = True)
    #member = models.ForeignKey(Account, blank = True, null=True, on_delete = models.SET_NULL)
    # group_tags = models.ManyToManyField(Tags)

    def __str__(self):
        return self.name

# class WorkoutGroupsAdmin(admin.ModelAdmin):
#     list_display = ('name','member')

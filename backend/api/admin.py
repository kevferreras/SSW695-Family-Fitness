from django.contrib import admin

# Register your models here.
from .models import Account, Post, Comment, Photo, Tags, WorkOuts
admin.site.register(Account)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(Tags)
admin.site.register(WorkOuts)

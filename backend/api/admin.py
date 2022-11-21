from django.contrib import admin

# Register your models here.
from .models import Account, Post, Comment, Photo, Tags, WorkOuts, AccountAdmin
admin.site.register(Account, AccountAdmin)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(Tags)
admin.site.register(WorkOuts)


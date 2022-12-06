from django.contrib import admin

# Register your models here.
from .models import Account, Post, Comment, Photo, WorkOuts, AccountAdmin,\
WorkoutsAdmin,WorkoutGroups
admin.site.register(Account, AccountAdmin)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(WorkOuts, WorkoutsAdmin)
admin.site.register(WorkoutGroups)
#admin.site.register(WorkoutGroups, WorkoutGroupsAdmin)


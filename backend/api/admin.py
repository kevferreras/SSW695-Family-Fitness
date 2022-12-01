from django.contrib import admin

# Register your models here.
<<<<<<< Updated upstream
from .models import Account, Post, Comment, Photo, Tags, WorkOuts
admin.site.register(Account)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(Tags)
admin.site.register(WorkOuts)
=======
from .models import Account, Post, Comment, Photo, WorkOuts, AccountAdmin, WorkoutsAdmin, WorkoutGroups
admin.site.register(Account, AccountAdmin)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(WorkOuts, WorkoutsAdmin)
admin.site.register(WorkoutGroups)
>>>>>>> Stashed changes

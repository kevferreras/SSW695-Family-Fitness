
from django.urls import include, re_path, path
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView,\
    GetAllFeedsView, CreateWorkoutAPIView, api_view
    #GroupAPIView
    
from api import views
# from api.view import views


urlpatterns = [
    re_path(r'^auth/login/$',
        obtain_auth_token,
        name='auth_user_login'),
    re_path(r'^auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    re_path(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),
    # re_path(r'^home/show_all/$',
    #     GetAllFeedsView.as_view(),
    #     name='home_show_all')
    path('allUserFeeds', GetAllFeedsView.get_workout_list),
    path('logworkout', CreateWorkoutAPIView.as_view()),
    path('creategetgroup', views.group_get_post, name = 'groupget&create'),
]

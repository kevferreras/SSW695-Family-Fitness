from django.test import TestCase, Client
from django.contrib.auth.models import User
from api.models import *
import datetime 
from datetime import timedelta
from dateutil.tz import UTC

class PostModelTest(TestCase):
    def setUpTestData():
        Post.objects.create(name = 'Running 5K', post = 'Running my 1st 5K today', 
                            post_date = '2022-11-07 05:55', post_likes = 3)

    def test_post_name_label(self):
        post = Post.objects.get(id=1)
        field_label = post._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Post')

    def test_post_name_max_length(self):
        post = Post.objects.get(id=1)
        max_length = post._meta.get_field('name').max_length
        self.assertEqual(max_length, 30)

    def test_post_name_value(self):
        post = Post.objects.get(id=1)
        name = getattr(post, 'name')
        self.assertEqual(name, 'Running 5K')

    def test_post_label(self):
        post = Post.objects.get(id=1)
        field_label = post._meta.get_field('post').verbose_name
        self.assertEqual(field_label, 'post')

    def test_post_date_label(self):
        date = Post.objects.get(id=1)
        field_label = date._meta.get_field('post_date').verbose_name
        self.assertEqual(field_label, 'post date')

    def test_post_likes_label(self):
        like = Post.objects.get(id=1)
        field_label = like._meta.get_field('post_likes').verbose_name
        self.assertEqual(field_label, 'post likes')

    def test_post_name_value(self):
        post = Post.objects.get(id=1)
        post_name = getattr(post, 'name')
        self.assertEqual(post_name, 'Running 5K')

    def test_post_value(self):
        post = Post.objects.get(id=1)
        post_name = getattr(post, 'post')
        self.assertEqual(post_name, 'Running my 1st 5K today')

    def test_post_date_value(self):
        post = Post.objects.get(id=1)
        post_date = getattr(post, 'post_date')
        self.assertEqual(post_date, datetime.datetime(2022, 11, 7, 5, 55, tzinfo= UTC))    

    def test_post_likes_value(self):
        post = Post.objects.get(id=1)
        post_likes = getattr(post, 'post_likes')
        self.assertEqual(post_likes, 3)

class CommentModelTest(TestCase):
    def setUpTestData():
        Comment.objects.create(name = 'Great work', comment = 'Love your progress')

    def test_comment_name_label(self):
        comment = Comment.objects.get(id=1)
        field_label = comment._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Comment')   

    def test_comment_label(self):
        comment = Comment.objects.get(id=1)
        field_label = comment._meta.get_field('comment').verbose_name
        self.assertEqual(field_label, 'comment')   

    def test_comment_name_value(self):
        comment = Comment.objects.get(id=1)
        comment_name = getattr(comment, 'name')
        self.assertEqual(comment_name, 'Great work')

    def test_comment_value(self):
        comment = Comment.objects.get(id=1)
        field_label = getattr(comment, 'comment')
        self.assertEqual(field_label, 'Love your progress')

class PhotoModelTest(TestCase):
    def setUpTestData():
        Photo.objects.create(name = 'Running')

    def test_photo_name_label(self):
        photo = Photo.objects.get(id=1)
        field_label = photo._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Photo')

    def test_photo_name_value(self):
        photo = Photo.objects.get(id=1)
        photo_name = getattr(photo, 'name')
        self.assertEqual(photo_name, 'Running')
    
class WorkoutsModelTest(TestCase):
    def setUpTestData():
        WorkOuts.objects.create(name = 'Running 5K', workout_type = 'Running', 
                                workout_intensity = 2, workout_duration = timedelta(days = 1) , start_time = '2022-11-07 05:00', 
                                end_time = '2022-11-07 05:30', total_distance = 5)

    def test_workouts_name_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'WorkOut Name')

    def test_workouts_name_max_length(self):
        workouts = WorkOuts.objects.get(id=1)
        max_length = workouts._meta.get_field('name').max_length
        self.assertEqual(max_length, 30)

    def test_workouts_name_value(self):
        workouts = WorkOuts.objects.get(id=1)
        name = getattr(workouts, 'name')
        self.assertEqual(name, 'Running 5K')

    def test_workout_type_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('workout_type').verbose_name
        self.assertEqual(field_label, 'workout type')

    def test_workout_type_max_length(self):
        workouts = WorkOuts.objects.get(id=1)
        max_length = workouts._meta.get_field('workout_type').max_length
        self.assertEqual(max_length, 30)    

    def test_workout_type_value(self):
        workouts = WorkOuts.objects.get(id=1)
        name = getattr(workouts, 'workout_type')
        self.assertEqual(name, 'Running')
    
    def test_workout_intensity_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('workout_intensity').verbose_name
        self.assertEqual(field_label, 'workout intensity')    

    def test_workout_intensity_value(self):
        workouts = WorkOuts.objects.get(id=1)
        name = getattr(workouts, 'workout_intensity')
        self.assertEqual(name, 2)

    def test_workout_duration_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('workout_duration').verbose_name
        self.assertEqual(field_label, 'workout duration')         

    def test_workout_duration_value(self):
        workouts = WorkOuts.objects.get(id=1)
        name = getattr(workouts, 'workout_duration')
        self.assertEqual(name, timedelta(days = 1))

    def test_workout_start_time_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('start_time').verbose_name
        self.assertEqual(field_label, 'start time')  

    def workout_start_time_value(self):
        workout = WorkOuts.objects.get(id=1)
        start_time = getattr(workout, 'start_time')
        self.assertEqual(start_time, datetime.datetime(2022, 11, 7, 5, 00, tzinfo= UTC))

    def test_workout_end_time_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('end_time').verbose_name
        self.assertEqual(field_label, 'end time')

    def workout_end_time_value(self):
        workout = WorkOuts.objects.get(id=1)
        end_time = getattr(workout, 'end_time')
        self.assertEqual(end_time, datetime.datetime(2022, 11, 7, 5, 30, tzinfo= UTC))

    def test_total_distance_label(self):
        workouts = WorkOuts.objects.get(id=1)
        field_label = workouts._meta.get_field('total_distance').verbose_name
        self.assertEqual(field_label, 'total distance')

    def test_total_distance_value(self):
        workouts = WorkOuts.objects.get(id=1)
        name = getattr(workouts, 'total_distance')
        self.assertEqual(name, 5)

class GroupsModelTest(TestCase):
    def setUpTestData():
        # Set up non-modified objects used by all test methods
         WorkoutGroups.objects.create(name= 'Running Group', group_description='A group for anyone interested in running')
         
    def test_groups_name_label(self):
        groups = WorkoutGroups.objects.get(id=1)
        field_label = groups._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Groups')

    def test_groups_name_max_length(self):
        groups = WorkoutGroups.objects.get(id=1)
        max_length = groups._meta.get_field('name').max_length
        self.assertEqual(max_length, 30)
        
    def test_groups_name_value(self):
        groups = WorkoutGroups.objects.get(id=1)
        name = getattr(groups, 'name')
        self.assertEqual(name, 'Running Group')

    def test_groups_description_label(self):
        groups = WorkoutGroups.objects.get(id=1)
        field_label = groups._meta.get_field('group_description').verbose_name
        self.assertEqual(field_label, 'group description')

    def test_groups_description_value(self):
        groups = WorkoutGroups.objects.get(id=1)
        group_description = getattr(groups, 'group_description')
        self.assertEqual(group_description, 'A group for anyone interested in running')

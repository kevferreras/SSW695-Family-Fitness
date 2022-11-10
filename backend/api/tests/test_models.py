from django.test import TestCase, Client
from django.contrib.auth.models import User
from api.models import *
import os
import datetime
from dateutil.tz import UTC

class AccountModelTest(TestCase):
    def setUpTestData():
        # Set up non-modified objects used by all test methods
        Account.objects.create(first_name='Big', last_name='Bob', email = 'bbob1@gmail.com', 
                                user_name = 'bbob1', password = 'password', last_seen = '2022-11-07 05:55')

    def test_first_name_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('first_name').verbose_name
        self.assertEqual(field_label, 'first name')
    
    def test_last_name_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('last_name').verbose_name
        self.assertEqual(field_label, 'last name')
        
    def test_email_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('email').verbose_name
        self.assertEqual(field_label, 'email')

    def test_username_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('user_name').verbose_name
        self.assertEqual(field_label, 'user name')

    def test_password_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('password').verbose_name
        self.assertEqual(field_label, 'password')

    def test_last_seen_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('last_seen').verbose_name
        self.assertEqual(field_label, 'last seen')

    def test_object_name_is_last_name_comma_first_name(self):
        account = Account.objects.get(id=1)
        expected_object_name = f'{account.first_name} {account.last_name}'
        self.assertEqual(str(account), expected_object_name)

    def test_first_name_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('first_name').max_length
        self.assertEqual(max_length, 30)

    def test_last_name_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('last_name').max_length
        self.assertEqual(max_length, 30)

    def test_email_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('email').max_length
        self.assertEqual(max_length, 254)

    def test_user_name_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('user_name').max_length
        self.assertEqual(max_length, 30)

    def test_password_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('password').max_length
        self.assertEqual(max_length, 30)

    def test_first_name_value(self):
        account = Account.objects.get(id=1)
        first_name = getattr(account, 'first_name')
        self.assertEqual(first_name, 'Big')

    def test_last_name_value(self):
        account = Account.objects.get(id=1)
        last_name = getattr(account, 'last_name')
        self.assertEqual(last_name, 'Bob')
    
    def test_email_value(self):
        account = Account.objects.get(id=1)
        email = getattr(account, 'email')
        self.assertEqual(email, 'bbob1@gmail.com')

    def test_user_name_value(self):
        account = Account.objects.get(id=1)
        user_name = getattr(account, 'user_name')
        self.assertEqual(user_name, 'bbob1')
        
    def test_password_value(self):
        account = Account.objects.get(id=1)
        password = getattr(account, 'password')
        self.assertEqual(password, 'password')

    def test_last_seen_value(self):
        account = Account.objects.get(id=1)
        last_seen = getattr(account, 'last_seen')
        self.assertEqual(last_seen, datetime.datetime(2022, 11, 7, 5, 55, tzinfo= UTC))

class PostModelTest(TestCase):
    def setUpTestData():
        Post.objects.create(name = 'Running 5K', post = 'Running my 1st 5K today', post_date = '2022-11-07 05:55', post_likes = 3)

    def test_post_name_label(self):
        post = Post.objects.get(id=1)
        field_label = post._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')        

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

    def test_post_value(self):
        post = Post.objects.get(id=1)
        post_name = getattr(post, 'name')
        self.assertEqual(post_name, 'Running 5K')

    def test_post_name_value(self):
        post = Post.objects.get(id=1)
        post_name = getattr(post, 'post_name')
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
        self.assertEqual(field_label, 'Comment')   

    def test_comment_name_value(self):
        comment = Comment.objects.get(id=1)
        comment_name = getattr(comment, 'comment_name')
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
        self.assertEqual(field_label, 'name')

    def test_photo_name_value(self):
        photo = Photo.objects.get(id=1)
        photo_name = getattr(photo, 'name')
        self.assertEqual(photo_name, 'Running')
    

class TagsModelTest(TestCase):
    def setUpTestData():
        # Set up non-modified objects used by all test methods
         Tags.objects.create(name= 'HIIT', tag_description='High Intensity Interval Training')
         
    def test_tags_name_label(self):
        tag = Tags.objects.get(id=1)
        field_label = tag._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Tags')
        
    def test_tags_name_max_length(self):
        tag = Tags.objects.get(id=1)
        max_length = tag._meta.get_field('name').max_length
        self.assertEqual(max_length, 30)

    def test_tags_name_value(self):
        tag = Tags.objects.get(id=1)
        name = getattr(tag, 'name')
        self.assertEqual(name, 'HIIT')

    def test_tags_description_label(self):
        tag = Tags.objects.get(id=1)
        field_label = tag._meta.get_field('tag_description').verbose_name
        self.assertEqual(field_label, 'tag description')
    
    def test_tags_description_value(self):
        tag = Tags.objects.get(id=1)
        tag_description = getattr(tag, 'tag_description')
        self.assertEqual(tag_description, 'High Intensity Interval Training')


class GroupsModelTest(TestCase):
    def setUpTestData():
        # Set up non-modified objects used by all test methods
         Groups.objects.create(name= 'Running Group', group_description='A group for anyone interested in running')
         
    def test_groups_name_label(self):
        groups = Groups.objects.get(id=1)
        field_label = groups._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'Groups')

    def test_groups_name_max_length(self):
        groups = Groups.objects.get(id=1)
        max_length = groups._meta.get_field('name').max_length
        self.assertEqual(max_length, 30)
        
    def test_groups_name_value(self):
        groups = Groups.objects.get(id=1)
        name = getattr(groups, 'name')
        self.assertEqual(name, 'Running Group')

    def test_groups_description_label(self):
        groups = Groups.objects.get(id=1)
        field_label = groups._meta.get_field('group_description').verbose_name
        self.assertEqual(field_label, 'group description')

    def test_groups_description_value(self):
        groups = Groups.objects.get(id=1)
        group_description = getattr(groups, 'group_description')
        self.assertEqual(group_description, 'A group for anyone interested in running')
        



    '''Models to be tested:
    Account - Kevin F - DONE
    Post - Harsh - DONE
    Comment - Harsh - DONE
    Photo - Harsh - DONE
    Tags - Kevin F - DONE
    Workouts - Harsh
    Groups - Kevin F - DONE
    '''
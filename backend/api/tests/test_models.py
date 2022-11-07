from django.test import TestCase, Client
from django.contrib.auth.models import User
from api.models import *
import os

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
    
    #[VALUE TESTS TO BE ADDED - KEVIN F]
    
    '''Models to be tested:
    Account - Kevin F
    Post - Harsh
    Comment - Harsh
    Photo - Harsh
    Tags - Kevin F
    Workouts - Harsh
    Groups - Kevin F
    '''
        

    
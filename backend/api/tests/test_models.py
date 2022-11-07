from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import *
import os

class AccountModelTest(TestCase):
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Account.objects.create(first_name='Big', last_name='Bob', email = 'bbob1@gmail.com', username = 'bbob1', password = 'password')

    def test_first_name_label(self):
        account = Account.objects.get(id=1)
        field_label = account._meta.get_field('first_name').verbose_name
        self.assertEqual(field_label, 'first name')

    def test_object_name_is_last_name_comma_first_name(self):
        account = Account.objects.get(id=1)
        expected_object_name = f'{account.last_name}, {account.first_name}'
        self.assertEqual(str(account), expected_object_name)

    def test_first_name_max_length(self):
        account = Account.objects.get(id=1)
        max_length = account._meta.get_field('first_name').max_length
        self.assertEqual(max_length, 30)
    
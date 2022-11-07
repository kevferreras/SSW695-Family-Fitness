# Create your tests here.
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .views import CreateUserAPIView
import os

class CreateUserAPIViewTest(TestCase):
    
    def setUp(self):
        self.client = Client()
        #os.system('curl -X POST -d "username=admin2&password=password" http://127.0.0.1:8000/api/auth/login/') 
    
    def test_view_url_for_login_exist_in_desired_location (self) -> None:
        response = self.client.get('/api/login/')
        self.assertEqual(response.status_code, 200)

    def test_view_url_for_logout_exist_in_desired_location (self) -> None:
        response = self.client.get('/api/logout/')
        self.assertEqual(response.status_code, 200)
        
    def test_view_url_for_admin_login_exist_in_desired_location (self) -> None:
        response = self.client.get('/admin/login/')
        self.assertEqual(response.status_code, 200)
    
    def test_view_url_for_admin_logout_exist_in_desired_location (self) -> None:
        password = 'mypassword' 

        my_admin = User.objects.create_superuser('myuser', 'myemail@test.com', password)
        self.client.login(username = my_admin.username, password = password)
        
        response = self.client.get('/admin/logout/')
        self.assertEqual(response.status_code, 200)
        
        
        
    
    # def test_view_url_for_auth_login_exist_in_desired_location (self) -> None:
    #     response = self.client.get('/api/auth/login/')
    #     self.assertEqual(response.status_code, 200)








#if __name__ == '__main__':
#   unittest.main(exit = False, verbosity = 2)
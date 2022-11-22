from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from api.serializers import CreateUserSerializer
from rest_framework.decorators import api_view

import json
from django.http import JsonResponse
from django.forms.models import model_to_dict

from api.models import Account, Post, Comment, Photo, Tags, WorkOuts
from api.serializers import WorkoutSerializer


class GetAllFeedsView(APIView):
    permission_classes = [AllowAny,]

    #@api_view(['GET'])
    def get_workout_list(request, *args, **kwargs):
        """
        API endpoint that return random user from database."""
        queryset = WorkOuts.objects.all()
        if queryset:
            #data = queryset.values('workout_account_id','name', 'workout_type', 'workout_duration', 'total_distance','gps_coordinates')
            data = WorkoutSerializer(queryset, many=True).data
        return JsonResponse(list(data), safe=False)

class CreateWorkoutAPIView(CreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **jwargs):
        '''Create a new workout in the db'''
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # If user data is valid, create a new todo item record in the database
            workout_item_object = serializer.save()
            
            # Serialize the new todo item from a Python object to JSON format
            read_serializer = self.get_serializer(workout_item_object)
            
            # headers = self.get_success_headers(serializer.data)
            
            # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)


        # If the users POST data is not valid, return a 400 response with an error message
        return Response(serializer.errors, status=400)

#   def post(self, request):
#     # Pass JSON data from user POST request to serializer for validation
#     create_serializer = TodoSerializer(data=request.data)

#     # Check if user POST data passes validation checks from serializer
#     if create_serializer.is_valid():

#       # If user data is valid, create a new todo item record in the database
#       todo_item_object = create_serializer.save()

#       # Serialize the new todo item from a Python object to JSON format
#       read_serializer = TodoSerializer(todo_item_object)

#       # Return a HTTP response with the newly created todo item data
#       return Response(read_serializer.data, status=201)

#     # If the users POST data is not valid, return a 400 response with an error message
#     return Response(create_serializer.errors, status=400)
#########################


# class TodoListView(
#   APIView, # Basic View class provided by the Django Rest Framework
#   UpdateModelMixin, # Mixin that allows the basic APIView to handle PUT HTTP requests
#   DestroyModelMixin, # Mixin that allows the basic APIView to handle DELETE HTTP requests
# ):

#   def get(self, request, id=None):
#     if id:
#       # If an id is provided in the GET request, retrieve the Todo item by that id
#       try:
#         # Check if the todo item the user wants to update exists
#         queryset = Todo.objects.get(id=id)
#       except Todo.DoesNotExist:
#         # If the todo item does not exist, return an error response
#         return Response({'errors': 'This todo item does not exist.'}, status=400)

#       # Serialize todo item from Django queryset object to JSON formatted data
#       read_serializer = TodoSerializer(queryset)

#     else:
#       # Get all todo items from the database using Django's model ORM
#       queryset = Todo.objects.all()

#       # Serialize list of todos item from Django queryset object to JSON formatted data
#       read_serializer = TodoSerializer(queryset, many=True)

#     # Return a HTTP response object with the list of todo items as JSON
#     return Response(read_serializer.data)


#   def post(self, request):
#     # Pass JSON data from user POST request to serializer for validation
#     create_serializer = TodoSerializer(data=request.data)

#     # Check if user POST data passes validation checks from serializer
#     if create_serializer.is_valid():

#       # If user data is valid, create a new todo item record in the database
#       todo_item_object = create_serializer.save()

#       # Serialize the new todo item from a Python object to JSON format
#       read_serializer = TodoSerializer(todo_item_object)

#       # Return a HTTP response with the newly created todo item data
#       return Response(read_serializer.data, status=201)

#     # If the users POST data is not valid, return a 400 response with an error message
#     return Response(create_serializer.errors, status=400)


#   def put(self, request, id=None):
#     try:
#       # Check if the todo item the user wants to update exists
#       todo_item = Todo.objects.get(id=id)
#     except Todo.DoesNotExist:
#       # If the todo item does not exist, return an error response
#       return Response({'errors': 'This todo item does not exist.'}, status=400)

#     # If the todo item does exists, use the serializer to validate the updated data
#     update_serializer = TodoSerializer(todo_item, data=request.data)

#     # If the data to update the todo item is valid, proceed to saving data to the database
#     if update_serializer.is_valid():

#       # Data was valid, update the todo item in the database
#       todo_item_object = update_serializer.save()

#       # Serialize the todo item from Python object to JSON format
#       read_serializer = TodoSerializer(todo_item_object)

#       # Return a HTTP response with the newly updated todo item
#       return Response(read_serializer.data, status=200)

#     # If the update data is not valid, return an error response
#     return Response(update_serializer.errors, status=400)


#   def delete(self, request, id=None):
#     try:
#       # Check if the todo item the user wants to update exists
#       todo_item = Todo.objects.get(id=id)
#     except Todo.DoesNotExist:
#       # If the todo item does not exist, return an error response
#       return Response({'errors': 'This todo item does not exist.'}, status=400)

#     # Delete the chosen todo item from the database
#     todo_item.delete()

#     # Return a HTTP response notifying that the todo item was successfully deleted
#     return Response(status=204)


##################################################


class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
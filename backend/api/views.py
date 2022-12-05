from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from api.serializers import CreateUserSerializer
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status



import json
from django.http import JsonResponse
from django.forms.models import model_to_dict

from api.models import *
from api.serializers import *


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

        if request.user.is_authenticated:
            user = request.user
        else:
            user = None

        if serializer.is_valid(raise_exception=True):
            # If user data is valid, create a new todo item record in the database
            workout_item_object = serializer.save(workout_account=user)
            
            # Serialize the new todo item from a Python object to JSON format
            read_serializer = self.get_serializer(workout_item_object)
            
            # headers = self.get_success_headers(serializer.data)
            
            # Return a HTTP response with the newly created todo item data
            return Response(read_serializer.data, status=201)


        # If the users POST data is not valid, return a 400 response with an error message
        return Response(serializer.errors, status=400)

class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if request.method == "POST":
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

# class GroupAPIView(CreateAPIView):
#     serializer_class = GroupSerializer
#     permission_classes = [AllowAny]
#     @csrf_exempt
#     def create(self, request, *args, **jwargs):
#         '''Create a new group in the db'''
#         if request.method == "POST":
#             serializer = self.get_serializer(data=request.data)

#             if request.user.is_authenticated:
#                 user = request.user
#             else:
#                 user = None

#             if serializer.is_valid(raise_exception=True):
#                 # If user data is valid, create a new todo item record in the database
#                 group_list = serializer.save(member=user)
                
#                 # Serialize the new todo item from a Python object to JSON format
#                 read_serializer = self.get_serializer(group_list)
                
#                 # headers = self.get_success_headers(serializer.data)
                
#                 # Return a HTTP response with the newly created todo item data
#             return Response(read_serializer.data, status=201)


#         # If the users POST data is not valid, return a 400 response with an error message
#         return Response(serializer.errors, status=400)
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def group_get_post(request):
    """this function will contain both GET and POST request for group module"""
    if (request.method == "GET"):
        """GET method will return all groups"""
        try:
            groups = WorkoutGroups.objects.all()
        except WorkoutGroups.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

        serializer = GroupSerializer(groups, many = True)
        return Response(serializer.data)
    
    elif (request.method == "POST"):
        """when using POST request, it will add group in database"""
        serializer = GroupSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(member = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #def get_group_list(request, *args, **kwargs):
# def get_group_list(request, *args, **kwargs):
#     """
#     this function will return a list of groups, output [{},{}...] 
#     """
#     queryset = WorkoutGroups.objects.all()
    
#     if queryset:
#         data = GroupSerializer(queryset, many = True).data
    
#     return JsonResponse(list(data), safe = False)


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
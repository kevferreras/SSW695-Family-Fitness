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
from api.serializers import WorkoutSerializer, CreateWorkoutSerializer


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
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
                    **serializer.data,
                    status=status.HTTP_201_CREATED,
                    headers=headers
                )

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
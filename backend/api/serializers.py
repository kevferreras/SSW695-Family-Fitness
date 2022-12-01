from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Account, Post, Comment, Photo, WorkOuts

class WorkoutSerializer(serializers.ModelSerializer):
        model = WorkOuts
        fields = ['name', 
                    'workout_type', 
                    'workout_intensity',
                    'workout_duration', 
                    'start_time',
                    'end_time',
                    'total_distance',
                    'gps_coordinates']

class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'first_name', 'last_name')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
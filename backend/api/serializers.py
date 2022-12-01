from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Account, Post, Comment, Photo, Tags, WorkOuts

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOuts
        fields = ['workout_account_id',
                    'name', 
                    'workout_type', 
                    'workout_duration', 
                    'total_distance',
                    'gps_coordinates']

<<<<<<< Updated upstream
=======
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOuts
        fields = ['name', 
                    'member',
                    'group_description']
>>>>>>> Stashed changes

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
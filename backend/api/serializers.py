from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Account, Post, Comment, Photo, Tags, WorkOuts

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOuts
        fields = ['name', 
                    'workout_type', 
                    'workout_duration', 
                    'total_distance',
                    'gps_coordinates']

    def create(self, validated_data):
        return WorkOuts.objects.create()

######################################
# class TodoSerializer(serializers.ModelSerializer):
#     text = serializers.CharField(max_length=1000, required=True)

#     def create(self, validated_data):
#         # Once the request data has been validated, we can create a todo item instance in the database
#         return Todo.objects.create(
#         text=validated_data.get('text')
#         )

#     def update(self, instance, validated_data):
#         # Once the request data has been validated, we can update the todo item instance in the database
#         instance.text = validated_data.get('text', instance.text)
#         instance.save()
#         return instance

#     class Meta:
#         model = Todo
#         fields = (
#         'id',
#         'text'
#         )
############################################

# class CreateWorkoutSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WorkOuts()
#         fields = ['workout_account_id',
#             'name', 
#             'workout_type', 
#             'workout_duration', 
#             'total_distance',
#             'gps_coordinates']
            

#     def create(self, validated_data):
#         workout = super(CreateWorkoutSerializer, self).create(validated_data)
#         # workout.set_password(validated_data['password'])
#         workout.save()
#         return workout


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
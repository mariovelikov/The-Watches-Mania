from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ['email', 'name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email = validated_data['email'], 
            name=validated_data['name']
        )

        user.set_password(validated_data['password'])
        
        user.save()
        return user
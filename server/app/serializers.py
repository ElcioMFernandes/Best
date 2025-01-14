from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['register', 'password', 'first_name', 'last_name']  # Inclua outros campos necessários
        extra_kwargs = {
            'password': {'write_only': True},  # Garante que a senha não seja exibida em respostas
        }

    def create(self, validated_data):
        # Garante que a senha seja salva como hash
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

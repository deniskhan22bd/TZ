from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email']

class PostSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'content', 'created_at']

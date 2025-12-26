from rest_framework import serializers
from .models import User, Project, ProjectMember, Repository, File, Comment, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'avatar_url', 'bio']
        read_only_fields = ['id', 'registration_date', 'last_login']


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'created_at', 'updated_at', 'visibility', 'status']
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = ProjectMember
        fields = ['id', 'project', 'user', 'role', 'joined_at', 'is_active']
        read_only_fields = ['id', 'joined_at', 'project', 'user']


class RepositorySerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Repository
        fields = ['id', 'project', 'default_branch', 'created_at']
        read_only_fields = ['id', 'created_at']


# core/serializers.py

from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'name', 'content', 'language', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Автоматически привязываем к текущему пользователю
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'type', 'title', 'message', 'related_id', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']
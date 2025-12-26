# core/views.py

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.db import models

from .models import (
    User, Project, ProjectMember, Repository, File, Comment, Notification
)
from .serializers import (
    UserSerializer, ProjectSerializer, ProjectMemberSerializer,
    RepositorySerializer, FileSerializer, CommentSerializer, NotificationSerializer
)

User = get_user_model()


# === АУТЕНТИФИКАЦИЯ ===

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    password = request.data.get('password')
    if not password:
        return Response({'password': 'Обязательное поле'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(password)
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# === ПРОЕКТЫ ===

class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)


# === УЧАСТНИКИ ПРОЕКТА ===

class ProjectMemberListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return ProjectMember.objects.filter(project_id=project_id, project__owner=self.request.user)

    def perform_create(self, serializer):
        project = get_object_or_404(Project, id=self.kwargs['project_id'], owner=self.request.user)
        serializer.save(project=project)


class ProjectMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return ProjectMember.objects.filter(project_id=project_id, project__owner=self.request.user)


# === РЕПОЗИТОРИИ ===

class RepositoryListCreateView(generics.ListCreateAPIView):
    serializer_class = RepositorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Repository.objects.filter(project_id=project_id, project__owner=self.request.user)

    def perform_create(self, serializer):
        project = get_object_or_404(Project, id=self.kwargs['project_id'], owner=self.request.user)
        serializer.save(project=project)


# === ФАЙЛЫ (привязаны к ПОЛЬЗОВАТЕЛЮ — для редактора) ===

class UserFileListView(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return File.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserFileDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return File.objects.filter(user=self.request.user)


# === КОММЕНТАРИИ ===

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# === УВЕДОМЛЕНИЯ ===

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class MarkNotificationAsReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        notification = get_object_or_404(Notification, id=pk, user=request.user)
        notification.is_read = True
        notification.save()
        return Response({'status': 'marked as read'})
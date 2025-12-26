from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    """Модель пользователя"""
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100, blank=True)
    avatar_url = models.URLField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    registration_date = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    # Убираем поля, которые уже есть в AbstractUser (password, first_name, last_name)
    # Но можно переопределить их, если нужно изменить поведение

    def __str__(self):
        return self.username
from django.conf import settings
from django.db import models

class Project(models.Model):
    """Модель проекта"""

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # ← правильно!
        on_delete=models.CASCADE,
        related_name='owned_projects'
    ) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    VISIBILITY_CHOICES = [
        ('private', 'Private'),
        ('public', 'Public'),
    ]
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default='public')
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('archived', 'Archived'),
        ('deleted', 'Deleted'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return self.name


class ProjectMember(models.Model):
    """Участник проекта"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('developer', 'Developer'),
        ('viewer', 'Viewer'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='viewer')
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('project', 'user')  # Один пользователь не может быть дважды в одном проекте

    def __str__(self):
        return f"{self.user.username} in {self.project.name} as {self.role}"


class Repository(models.Model):
    """Репозиторий проекта"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='repositories')
    default_branch = models.CharField(max_length=50, default='main')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Repo for {self.project.name}"


# core/models.py

from django.conf import settings
from django.db import models

class File(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='files')
    project = models.ForeignKey('Project', on_delete=models.SET_NULL, null=True, blank=True, related_name='files')
    name = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    language = models.CharField(max_length=50, default='plaintext')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    """Комментарий (связан с Pull Request, но для упрощения пока без PR)"""
    # pull_request = models.ForeignKey(PullRequest, on_delete=models.CASCADE, related_name='comments') # Пока нет модели PullRequest
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.user.username} at {self.created_at}"


class Notification(models.Model):
    """Уведомление"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    TYPE_CHOICES = [
        ('pull_request', 'Pull Request'),
        ('comment', 'Comment'),
        ('invitation', 'Invitation'),
        ('update', 'Update'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    related_id = models.IntegerField(null=True, blank=True)  # ID связанной сущности (например, проекта, комментария)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} notification for {self.user.username}"
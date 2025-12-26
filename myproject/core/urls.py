# core/urls.py

from django.urls import path
from .views import (
    register,
    login,
    ProjectListCreateView,
    ProjectDetailView,
    ProjectMemberListCreateView,
    ProjectMemberDetailView,
    RepositoryListCreateView,
    UserFileListView,
    UserFileDetailView,
    CommentListCreateView,
    NotificationListView,
    MarkNotificationAsReadView,
)

urlpatterns = [
    # Аутентификация
    path('register/', register, name='register'),
    path('login/', login, name='login'),

    # Проекты
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),

    # Участники проекта
    path('projects/<int:project_id>/members/', ProjectMemberListCreateView.as_view(), name='project-member-list-create'),
    path('projects/<int:project_id>/members/<int:pk>/', ProjectMemberDetailView.as_view(), name='project-member-detail'),

    # Репозитории
    path('projects/<int:project_id>/repositories/', RepositoryListCreateView.as_view(), name='repository-list-create'),

    # Файлы (привязаны к пользователю)
    path('files/', UserFileListView.as_view(), name='user-file-list'),
    path('files/<int:pk>/', UserFileDetailView.as_view(), name='user-file-detail'),

    # Комментарии
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),

    # Уведомления
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/mark-read/', MarkNotificationAsReadView.as_view(), name='mark-notification-read'),
]


from rest_framework import permissions
from .models import ProjectMember

class IsProjectOwnerOrAdmin(permissions.BasePermission):
    """
    Разрешает действия только владельцу проекта или админу.
    Предполагается, что view.kwargs содержит 'project_id' или объект связан с Project.
    """

    def has_object_permission(self, request, view, obj):
        # Если obj — это Project
        if hasattr(obj, 'owner'):
            project = obj
        # Если obj — это ProjectMember, Repository и т.д., и у него есть project
        elif hasattr(obj, 'project'):
            project = obj.project
        else:
            return False

        # Ищем роль текущего пользователя в этом проекте
        member = ProjectMember.objects.filter(
            project=project,
            user=request.user,
            is_active=True
        ).first()

        if not member:
            return False

        return member.role in ['owner', 'admin']
    
    from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """Разрешение: только администраторы"""

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin
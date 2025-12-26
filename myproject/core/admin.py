# core/admin.py

from django.contrib import admin
from .models import User, Project, ProjectMember, Repository, File, Comment, Notification

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_active', 'registration_date')
    search_fields = ('username', 'email')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'visibility', 'status', 'created_at')
    list_filter = ('visibility', 'status')

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')
    search_fields = ('name', 'user__username')

# Зарегистрируйте остальные модели (или используйте admin.site.register)
admin.site.register(ProjectMember)
admin.site.register(Repository)
admin.site.register(Comment)
admin.site.register(Notification)
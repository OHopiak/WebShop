from django.contrib.auth.models import User
from rest_framework import permissions


class IsSelfOrAdmin(permissions.BasePermission):
	def has_permission(self, request, view):
		return bool(
			request.method in permissions.SAFE_METHODS or
			request.method in ['PUT', 'PATCH']
		)

	def has_object_permission(self, request, view, obj):
		return bool(
			request.method in permissions.SAFE_METHODS or
			request.user.is_superuser or
			(type(obj) == User and obj.id == request.user.id)
		)

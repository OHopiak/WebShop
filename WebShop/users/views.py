from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response

from utils.permissions import IsSelfOrAdmin
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer, AdminUserSerializer


class UserViewSet(viewsets.ModelViewSet):
	"""
	A view set for Items
	"""
	queryset = User.objects.all()
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('username',)
	permission_classes = (IsSelfOrAdmin,)

	@action(detail=False, methods=['GET'])
	def current(self, request):
		serializer = self.get_serializer(request.user)
		return Response(serializer.data)

	def get_serializer_class(self):
		if self.request.user.is_staff:
			return AdminUserSerializer
		return UserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
	"""
	A view set for Categories
	"""
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('user__username',)

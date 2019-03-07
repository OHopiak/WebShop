from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
	"""
	A view set for Items
	"""
	queryset = User.objects.all()
	serializer_class = UserSerializer
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('username',)


class UserProfileViewSet(viewsets.ModelViewSet):
	"""
	A view set for Categories
	"""
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('user__username',)

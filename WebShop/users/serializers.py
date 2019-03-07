from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
	url = serializers.HyperlinkedRelatedField(view_name='users-detail', read_only=True)

	class Meta:
		model = User
		fields = (
			"id", "url", "last_login", "is_superuser", "username", "first_name", "last_name",
			"email", "is_staff", "is_active", "date_joined", "groups", "user_permissions",
		)


class UserProfileSerializer(serializers.ModelSerializer):
	# url = serializers.HyperlinkedRelatedField(view_name='user_profile-detail', read_only=True)
	class Meta:
		model = UserProfile
		fields = ('id', 'user',)

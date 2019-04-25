from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='user-detail', read_only=True)
	password = serializers.CharField(
		write_only=True,
		required=True,
		help_text='Leave empty if no change needed',
		style={'input_type': 'password', 'placeholder': 'Password'}
	)

	class Meta:
		model = User
		read_only_fields = ('is_superuser', 'is_staff', 'groups', 'user_permissions', 'last_login', 'date_joined')
		fields = (
			'id', 'url', 'last_login', 'is_superuser', 'username', 'first_name', 'last_name', 'password',
			'email', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions',
		)

	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data.get('password'))
		return super(UserSerializer, self).create(validated_data)

	def update(self, instance, validated_data):
		validated_data['password'] = make_password(validated_data.get('password'))
		return super(UserSerializer, self).update(instance, validated_data)


class AdminUserSerializer(UserSerializer):
	class Meta:
		model = User
		read_only_fields = ('last_login', 'date_joined')
		fields = (
			'id', 'url', 'last_login', 'is_superuser', 'username', 'first_name', 'last_name', 'password',
			'email', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions',
		)

	def create(self, validated_data):
		return super(AdminUserSerializer, self).create(validated_data)

	def update(self, instance, validated_data):
		return super(AdminUserSerializer, self).update(instance, validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
	# url = serializers.HyperlinkedIdentityField(view_name='user_profile-detail', read_only=True)
	class Meta:
		model = UserProfile
		fields = ('id', 'user',)
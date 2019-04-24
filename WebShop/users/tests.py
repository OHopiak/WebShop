from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from users.serializers import AdminUserSerializer
from users.views import UserViewSet


class AdminUserSerializerTest(TestCase):
	data = {
		'username': 'test',
		'password': 'password123',
	}

	def test_create(self):
		data = self.data
		username = data.get('username')
		password = data.get('password')

		serializer = AdminUserSerializer(data=data)
		self.assertTrue(serializer.is_valid(), 'user serialization failed')

		user = serializer.save()
		self.assertEqual(user.username, username)

		self.assertTrue(check_password(password, user.password), 'authentication failed')


class UserViewSetTest(TestCase):
	data = {
		'username': 'test',
		'password': 'password123',
	}

	def setUp(self):
		self.superuser = User.objects.create_superuser('unit', 'unit@test.com', 'unitpass', is_staff=True, is_active=True)

	def test_details(self):
		request = APIRequestFactory().get('')
		user_detail = UserViewSet.as_view({'get': 'retrieve'})
		user = User.objects.create(username='test')
		response = user_detail(request, pk=user.pk)
		self.assertEqual(response.status_code, 200)

	def test_create_unauthenticated(self):
		request = APIRequestFactory().post('', self.data)
		user_create = UserViewSet.as_view({'post': 'create'})
		response = user_create(request)
		self.assertEqual(response.status_code, 401, 'allowing user creation for unauthenticated user')

	def test_create(self):
		data = self.data
		username = data.get('username')
		password = data.get('password')

		request = APIRequestFactory().post('', data)
		force_authenticate(request, user=self.superuser)
		user_create = UserViewSet.as_view({'post': 'create'})
		response = user_create(request)
		self.assertEqual(response.status_code, 201, 'failed to create the user')

		new_user = User.objects.filter(pk=response.data.get('id')).first()
		self.assertIsNotNone(new_user, 'no user created')
		self.assertEqual(new_user.username, username, 'username is not the same')
		self.assertTrue(check_password(password, new_user.password), 'authentication failed')

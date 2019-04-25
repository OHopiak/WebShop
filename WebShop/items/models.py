from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
	name = models.CharField(max_length=128)
	description = models.TextField()
	parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)


class Item(models.Model):
	name = models.CharField(max_length=256)
	description = models.TextField()
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	price = models.FloatField()
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

	def __str__(self):
		return '({}) {}'.format(self.id, self.name)


class Order(models.Model):
	user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='orders', null=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	paid = models.BooleanField(default=False)


class OrderItem(models.Model):
	order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
	item = models.ForeignKey(Item, on_delete=models.CASCADE)
	quantity = models.IntegerField(default=1)


class UserBucket(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='bucket')
	order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, default=None)
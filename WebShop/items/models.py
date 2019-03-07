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

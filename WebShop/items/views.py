from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer


class ItemViewSet(viewsets.ModelViewSet):
	"""
	A view set for Items
	"""
	queryset = Item.objects.all()
	serializer_class = ItemSerializer
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('name', 'description', 'category')


class CategoryViewSet(viewsets.ModelViewSet):
	"""
	A view set for Categories
	"""
	queryset = Category.objects.all()
	serializer_class = CategorySerializer
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = ('name', 'description', 'parent')

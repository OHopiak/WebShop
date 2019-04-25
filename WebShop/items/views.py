from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Item, Category, Order, OrderItem
from .serializers import ItemSerializer, CategorySerializer, OrderSerializer, UserBucketSerializer, OrderItemSerializer


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


class OrderViewSet(viewsets.ModelViewSet):
	"""
	A view set for Orders
	"""
	queryset = Order.objects.all()
	serializer_class = OrderSerializer

	@action(detail=False, methods=['GET'], permission_classes=(IsAuthenticated,))
	def bucket(self, request):
		serializer = UserBucketSerializer(instance=request.user.bucket, context={'request': request})
		return Response(serializer.data)

	@action(detail=False, methods=['GET', 'POST'], permission_classes=(IsAuthenticated,),
			serializer_class=OrderItemSerializer)
	def add(self, request):
		if request.method == 'POST':
			serializer = OrderItemSerializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			serializer.save(order=request.user.bucket.order)
		serializer = UserBucketSerializer(instance=request.user.bucket, context={'request': request})
		return Response(serializer.data)

	@action(detail=False, methods=['GET', 'POST'], permission_classes=(IsAuthenticated,),
			serializer_class=OrderItemSerializer)
	def edit(self, request):
		if request.method == 'POST':
			order_item_id = request.data.get('id')
			order_item = OrderItem.objects.filter(id=order_item_id).first()
			if order_item is None:
				raise NotFound(detail='An object item with id {} was not found'.format(order_item_id))

			serializer = OrderItemSerializer(instance=order_item_id, data=request.data)
			serializer.is_valid(raise_exception=True)
			serializer.save(order=request.user.bucket.order)
		
		serializer = UserBucketSerializer(instance=request.user.bucket, context={'request': request})
		return Response(serializer.data)

	@action(detail=False, methods=['GET', 'POST'], permission_classes=(IsAuthenticated,))
	def delete(self, request):
		if request.method == 'POST':
			order_item_id = request.data.get('id')
			order_item = OrderItem.objects.filter(id=order_item_id).first()
			if order_item is None:
				raise NotFound(detail='An object item with id {} was not found'.format(order_item_id))

			order_item.delete()

		serializer = UserBucketSerializer(instance=request.user.bucket, context={'request': request})
		return Response(serializer.data)

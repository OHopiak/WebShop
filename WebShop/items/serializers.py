from rest_framework import serializers

from .models import Item, Category, Order, OrderItem, UserBucket


class ItemSerializer(serializers.ModelSerializer):
	# created = serializers.DateTimeField(initial=datetime.datetime.today)
	url = serializers.HyperlinkedIdentityField(view_name='item-detail', read_only=True)

	class Meta:
		model = Item
		fields = ('id', 'url', 'name', 'description', 'price', 'category', 'created', 'updated')
		read_only_fields = ('updated', 'created')


class CategorySerializer(serializers.ModelSerializer):
	# created = serializers.DateTimeField(initial=datetime.datetime.today)
	url = serializers.HyperlinkedIdentityField(view_name='category-detail', read_only=True)

	class Meta:
		model = Category
		fields = ('id', 'url', 'name', 'description', 'parent')


class OrderItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = OrderItem
		fields = ('id', 'item', 'quantity')


class OrderSerializer(serializers.ModelSerializer):
	url = serializers.HyperlinkedIdentityField(view_name='order-detail', read_only=True)
	items = OrderItemSerializer(many=True, read_only=True)

	class Meta:
		model = Order
		fields = ('id', 'url', 'user', 'items', 'created', 'updated', 'paid')
		read_only_fields = ('items', 'updated', 'created')


class UserBucketSerializer(serializers.ModelSerializer):
	order = OrderSerializer(read_only=True)

	class Meta:
		model = UserBucket
		fields = ('order',)

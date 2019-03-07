from rest_framework import serializers

from .models import Item, Category


class ItemSerializer(serializers.ModelSerializer):
	# created = serializers.DateTimeField(initial=datetime.datetime.today)
	url = serializers.HyperlinkedRelatedField(view_name='item-detail', read_only=True)

	class Meta:
		model = Item
		fields = ('id', 'url', 'name', 'description', 'price', 'category', 'created', 'updated')
		read_only_fields = ('updated', 'created')


class CategorySerializer(serializers.ModelSerializer):
	# created = serializers.DateTimeField(initial=datetime.datetime.today)
	url = serializers.HyperlinkedRelatedField(view_name='category-detail', read_only=True)

	class Meta:
		model = Category
		fields = ('id', 'url', 'name', 'description', 'parent')

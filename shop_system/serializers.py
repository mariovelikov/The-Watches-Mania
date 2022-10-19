from rest_framework import serializers
from shop_system.models import Favorites, ImageModel, OrderModel, OrderedProductModel
from .views import AdModel


class ImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ['id', 'image']


class AdSerializers(serializers.ModelSerializer):

    # This variable (name) should be the same as the 'related_same' in models.py
    images = ImageSerializers(many=True, read_only=True)

    class Meta:
        model = AdModel
        fields = '__all__'


class OrderedProductSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'productId', 'title', 'brand', 'price']
        model = OrderedProductModel


class OrderSerializers(serializers.ModelSerializer):
    order = OrderedProductSerializer(many=True, read_only=True)

    class Meta:
        model = OrderModel
        fields = '__all__'


class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'

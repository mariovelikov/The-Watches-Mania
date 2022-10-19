from django.contrib import admin
from .models import Favorites, ImageModel, OrderModel, OrderedProductModel
from shop_system.models import AdModel


class ImageInline(admin.StackedInline):
    model = ImageModel


class AdAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    inlines = (ImageInline, )


class OrderedProductInline(admin.StackedInline):
    model = OrderedProductModel


class OrderedProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'order')


class OrderAdmin(admin.ModelAdmin):
    verbose_name = "Cart"
    list_display = ('id', 'email', 'date')
    inlines = (OrderedProductInline, )


class FavoritesAdmin(admin.ModelAdmin):
    list_display = ('id', 'productId', 'user')


admin.site.register(AdModel, AdAdmin)
admin.site.register(ImageModel)
admin.site.register(OrderModel, OrderAdmin)
admin.site.register(OrderedProductModel, OrderedProductAdmin)
admin.site.register(Favorites, FavoritesAdmin)

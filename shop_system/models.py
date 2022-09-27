from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class AdModel(models.Model):
    GENDER = (
        ('male', 'MALE'),
        ('female', 'FEMALE'),
        ('unisex', 'UNISEX'),
    )

    MOVEMENT_TYPE = (
        ('automatic', 'Automatic'),
        ('digital', 'Digital'),
        ('solar/eco-drive', 'Solar/Eco-Drive'),
        ('quartz', 'Quartz'),
        ('hand wind', 'Hand Wind'),
    )

    title = models.CharField(max_length=50, blank=False)
    brand = models.CharField(max_length=50)
    description = models.CharField(max_length=2500)
    gender = models.CharField(max_length=6, choices=GENDER)
    movement_type = models.CharField(max_length=15, choices=MOVEMENT_TYPE)
    price = models.FloatField()
    image = models.ImageField(
        upload_to='static/media/', null=True, blank=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Products'


class ImageModel(models.Model):

    # additional photos
    image = models.ImageField(upload_to='static/media/')
    Ad = models.ForeignKey(AdModel, on_delete=models.CASCADE,
                           blank=True, null=True, related_name='images')

    class Meta:
        verbose_name_plural = 'All Images'


class OrderModel(models.Model):
    email = models.EmailField(blank=False)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    postCode = models.IntegerField()
    street = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Orders'


class OrderedProductModel(models.Model):
    productId = models.IntegerField()
    title = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    price = models.FloatField()
    quantity = models.IntegerField()

    order = models.ForeignKey(
        OrderModel, on_delete=models.CASCADE, related_name='order')

    class Meta:
        verbose_name_plural = 'All Ordered Products'


class Favorites(models.Model):
    productId = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=False)

    class Meta:
        verbose_name_plural = 'Favorites'

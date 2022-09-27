from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from shop_system.models import AdModel
from .serializers import *
from rest_framework import status
from accounts.models import User
from django.core.mail import send_mail


@api_view(["GET", "POST"])
def get_all_ads(request):
    if request.method == "GET":
        model = AdModel.objects.all()
        serializer = AdSerializers(model, many=True)
        return Response(serializer.data)

    elif request.method == "POST" and request.user.is_staff:
        serializer = AdSerializers(data=request.data)

        if serializer.is_valid():

            # save serializer in variable because i need ID of this serializer below
            ser = serializer.save()
            for img in request.data.getlist('images'):
                AD = AdModel.objects.get(id=ser.id)

                image = ImageModel(Ad=AD, image=img)
                image.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Method not allowed", status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "PUT", "DELETE"])
def get_ad_details(request, pk):
    if request.method == "GET":
        AdObj = AdModel.objects.get(pk=pk)
        serializer = AdSerializers(AdObj)

        return Response(serializer.data)
    elif request.method == 'DELETE' and request.user.is_staff:
        AdObj = AdModel.objects.get(pk=pk)
        AdObj.image.delete()

        for model in ImageModel.objects.all():
            if model.Ad == AdObj:
                model.image.delete()
                model.delete()
        AdObj.delete()

        return Response(status=status.HTTP_200_OK)

    elif request.method == "PUT" and request.user.is_staff:
        Ad = AdModel.objects.get(id=pk)
        serializer = AdSerializers(Ad, request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(status=status.HTTP_201_CREATED)


# get all orders and post order to backend
@api_view(["GET", "POST"])
def get_all_orders(request):
    if request.method == "GET":
        order = OrderModel.objects.all()
        serializer = OrderSerializers(order, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = OrderSerializers(data=request.data)

        if not request.data.get('products'):
            return Response(data="Don't have products", status=status.HTTP_400_BAD_REQUEST)

        else:
            if serializer.is_valid():
                # save oreder
                order = serializer.save()

                # send mail
                send_mail(
                    'Order Mail',
                    'Your products are ordered !',
                    'djangoapp514@gmail.com',
                    [request.data['email']],
                    fail_silently=False,
                )

                for el in request.data.get('products'):
                    product = OrderedProductModel(
                        productId=el['id'], title=el['title'], brand=el['brand'], price=el['price'], quantity=int(el['quantity']), order=order)
                    product.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(data={'error': 'Fill all fields !'}, status=status.HTTP_400_BAD_REQUEST)


# get order details and delete it
@api_view(['GET', 'DELETE'])
def get_order_details(request, pk):
    if request.method == 'GET':
        order = OrderModel.objects.get(pk=pk)
        serializer = OrderSerializers(order)

        return Response(serializer.data)
    elif request.method == 'DELETE' and request.user.is_staff:
        order = OrderModel.objects.get(pk=pk)
        order.delete()

        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def get_all_favorites(request):
    if request.method == "GET":
        fav = Favorites.objects.filter(user=request.user).values()
        serializer = FavoritesSerializer(fav, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FavoritesSerializer(data=request.data)

        # return all products of this user
        model = Favorites.objects.filter(user=request.user).values()
        all_user_products_ser = FavoritesSerializer(model, many=True)

        # check if the product exists in Favorites
        checkExists = Favorites.objects.filter(
            productId=request.data['productId'], user=request.user).exists()
        if checkExists:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            if serializer.is_valid():
                product = serializer.save()

                product.user = request.user
                product.save()

                return Response(data=all_user_products_ser.data, status=status.HTTP_201_CREATED)
            else:
                return Response(data=serializer.errors)


@api_view(['DELETE'])
def remove_from_favorites(request, pk):
    if request.method == 'DELETE':
        current_user = request.user

        # find the product and DELETE it
        product = Favorites.objects.get(productId=pk, user=current_user)
        product.delete()

        # return other products
        all_products = Favorites.objects.filter(user=current_user)
        serializer = FavoritesSerializer(all_products, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
    pass

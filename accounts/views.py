from rest_framework import status
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserCreationSerializer
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class SignUp(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        form = UserCreationSerializer(data=request.data)
        
        if form.is_valid():
            form.save()
            if form:
                return Response(data=form.data, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class LoadUser(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print(request.user.email)

        user = {
            "name": request.user.name,
            "is_admin": request.user.is_staff
        }

        return Response(data=user, status=status.HTTP_200_OK)


class LogOut(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data["refresh_token"]
        tokenx = RefreshToken(refresh_token)
        tokenx.blacklist()

        return Response(status=status.HTTP_200_OK)
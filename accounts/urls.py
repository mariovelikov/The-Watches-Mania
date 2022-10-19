from django.urls import path
from accounts.views import SignUp
from accounts.views import *


urlpatterns = [
    path('signup/', SignUp.as_view(), name='sign up'),
    path('loaduser/', LoadUser.as_view(), name='load user'),
    path('logout/blacklist/', LogOut.as_view(), name='log out'),
]

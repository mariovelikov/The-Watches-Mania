from django.urls import path
from .views import *
from django.views.generic import TemplateView


urlpatterns = [
    path('api/data/', get_all_ads, name='landing rest'),
    path('api/<int:pk>/data/', get_ad_details, name='get ad images'),
    path('api/orders/', get_all_orders, name='orders'),
    path('api/<int:pk>/order/', get_order_details, name='order'),
    path('api/favorites/', get_all_favorites, name='favorites'),
    path('api/remove_fav/<int:pk>', remove_from_favorites,
         name='remove from favorites'),

    path('products/', TemplateView.as_view(template_name='index.html')),
    path('<int:id>/details/', TemplateView.as_view(template_name='index.html')),
    path('post/', TemplateView.as_view(template_name='index.html')),
    path('cart/', TemplateView.as_view(template_name='index.html')),
    path('order/', TemplateView.as_view(template_name='index.html')),
    path('favorites/', TemplateView.as_view(template_name='index.html')),
    path('signup/', TemplateView.as_view(template_name='index.html')),
    path('signin/', TemplateView.as_view(template_name='index.html')),
]

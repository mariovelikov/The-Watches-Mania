from django.forms import ModelForm
from .models import *

# class AdForm(ModelForm):
#     class Meta:
#         model = AdModels
#         fields = "__all__"


class AdImage(ModelForm):
    class Meta:
        model = ImageModel
        fields = ("image", )
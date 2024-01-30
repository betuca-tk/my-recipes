from django.urls import path
from .views import ListRecipesView

urlpatterns = [
    path("", ListRecipesView.as_view(), name="list_recipes"),
]

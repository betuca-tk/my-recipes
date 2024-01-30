from django.urls import path
from .views import RecipesView

app_name = "recipes_book"

urlpatterns = [
    path("", RecipesView.as_view()),
]

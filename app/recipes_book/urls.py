from django.urls import path
from .views import RecipesView

app_name = "recipes_book"

urlpatterns = [
    path("", RecipesView.as_view()),
    path("<int:recipe_id>/", RecipesView.as_view()),
]

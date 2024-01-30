from . import models
from django.http import JsonResponse
from django.views import View
import json


class RecipesView(View):
    def get(self, request):
        recipes = models.Recipe.objects.all()
        recipes_result = [recipe.to_dict() for recipe in recipes]
        return JsonResponse(recipes_result, safe=False)

    def post(self, request):
        data = json.loads(request.body)
        recipe = models.Recipe.objects.create(
            name=data["name"], description=data["description"]
        )
        for ingredient_name in data["ingredients"]:
            ingredient = models.Ingredient.objects.create(name=ingredient_name)
            recipe.ingredients.add(ingredient)
        return JsonResponse(recipe.to_dict(), status=201)

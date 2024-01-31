from . import models
from django.http import JsonResponse, Http404, HttpResponse
from django.views import View
import json


class RecipesView(View):
    def get(self, request, recipe_id=None):
        if recipe_id:
            recipe = self._load_by_id(recipe_id)
            return JsonResponse(recipe)
        elif request.GET.get("name"):
            filter_name = request.GET.get("name")
            recipes = self._load_recipes_by_name(filter_name)
            return JsonResponse(recipes, safe=False)
        else:
            recipes = self._load_all_recipes()
            return JsonResponse(recipes, safe=False)

    def _load_by_id(self, recipe_id):
        try:
            recipe = models.Recipe.objects.get(id=recipe_id)
            return recipe.to_dict()
        except models.Recipe.DoesNotExist:
            raise Http404("Recipe not found")

    def _load_all_recipes(self):
        recipes = models.Recipe.objects.all()
        recipes_result = [recipe.to_dict() for recipe in recipes]
        return recipes_result

    def _load_recipes_by_name(self, name):
        recipes = models.Recipe.objects.filter(name__icontains=name)
        recipes_result = [recipe.to_dict() for recipe in recipes]
        return recipes_result

    def post(self, request):
        data = json.loads(request.body)
        recipe = models.Recipe.objects.create(
            name=data["name"], description=data["description"]
        )
        self._add_ingridients(recipe, data)
        return JsonResponse(recipe.to_dict(), status=201)

    def delete(self, request, recipe_id):
        try:
            recipe = models.Recipe.objects.get(id=recipe_id)
            if recipe.ingredients:
                for ingredient in recipe.ingredients.all():
                    ingredient.delete()
            recipe.delete()
            return HttpResponse(status=204)
        except models.Recipe.DoesNotExist:
            raise Http404("Recipe not found")

    def patch(self, request, recipe_id):
        try:
            recipe = models.Recipe.objects.get(id=recipe_id)
            data = json.loads(request.body)
            recipe.name = data["name"] if "name" in data else recipe.name
            recipe.description = (
                data["description"] if "description" in data else recipe.description
            )
            if "ingredients" in data:
                recipe.ingredients.clear()
                self._add_ingridients(recipe, data)
            recipe.save()
            return JsonResponse(recipe.to_dict(), status=200)
        except models.Recipe.DoesNotExist:
            raise Http404("Recipe not found")

    def _add_ingridients(self, recipe, data):
        for ingredient in data["ingredients"]:
            ingredient = models.Ingredient.objects.create(name=ingredient["name"])
            recipe.ingredients.add(ingredient)
        return recipe

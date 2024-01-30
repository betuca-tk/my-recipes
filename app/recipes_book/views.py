from . import models
from django.http import JsonResponse
from django.views import View


class ListRecipesView(View):
    def get(self, request):
        print("ListRecipesView")
        recipes = models.Recipe.objects.all()
        recipes_result = [recipe.to_dict() for recipe in recipes]
        return JsonResponse(recipes_result, safe=False)

from . import models
from django.http import JsonResponse


def list_all(request):
    recipes = models.Recipe.objects.all()
    recipes_result = [recipe.to_dict() for recipe in recipes]
    return JsonResponse(recipes_result, safe=False)

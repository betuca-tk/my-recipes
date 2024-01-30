from . import models
from django.http import JsonResponse


def list_all(request):
    recipes = models.Recipe.objects.all()
    recipes_result = [str(recipe) for recipe in recipes]
    return JsonResponse({"recipes": recipes_result})

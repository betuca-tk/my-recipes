from django.test import TestCase
from recipes_book.models import Recipe
import json


class RecipeTest(TestCase):
    """
    Test module for Recipe model
    """

    def test_create_recipe_response(self):
        """
        Test POST response for recipe creation
        """
        posta_data = {
            "name": "Recipe 1",
            "description": "Recipe 1 description",
            "ingredients": [
                {"name": "Ingredient 1"},
                {"name": "Ingredient 2"},
            ],
        }

        response = self.client.post(
            "/recipes/", json.dumps(posta_data), content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)

        response_data = response.json()
        self.assertEqual(response_data["name"], "Recipe 1")
        self.assertEqual(response_data["description"], "Recipe 1 description")
        self.assertEqual(len(response_data["ingredients"]), 2)

    def test_create_recipe_data_saved(self):
        """
        Test POST data saved for recipe creation
        """
        posta_data = {
            "name": "Recipe 1",
            "description": "Recipe 1 description",
            "ingredients": [
                {"name": "Ingredient 1"},
                {"name": "Ingredient 2"},
            ],
        }

        self.client.post(
            "/recipes/", json.dumps(posta_data), content_type="application/json"
        )

        saved_recipe = Recipe.objects.get(name=posta_data["name"])
        self.assertEqual(saved_recipe.description, posta_data["description"])
        self.assertEqual(saved_recipe.ingredients.count(), 2)

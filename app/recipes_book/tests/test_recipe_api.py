from django.test import TestCase
from recipes_book.models import Recipe, Ingredient
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

    def test_get_recipes(self):
        """
        Test GET response for recipe list
        """
        recipe1 = Recipe.objects.create(
            name="Recipe 1",
            description="Recipe 1 description",
        )
        ingredient1 = Ingredient.objects.create(name="Ingredient 1")
        ingredient2 = Ingredient.objects.create(name="Ingredient 2")
        recipe1.ingredients.add(ingredient1)
        recipe1.ingredients.add(ingredient2)

        recipe2 = Recipe.objects.create(
            name="Recipe 2",
            description="Recipe 2 description",
        )

        response = self.client.get("/recipes/")
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(len(response_data), 2)

        recipe1_data = response_data[0]
        self.assertEqual(recipe1_data["name"], recipe1.name)
        self.assertEqual(recipe1_data["description"], recipe1.description)
        self.assertEqual(len(recipe1_data["ingredients"]), 2)
        self.assertEqual(recipe1_data["ingredients"][0]["name"], "Ingredient 1")
        self.assertEqual(recipe1_data["ingredients"][1]["name"], "Ingredient 2")

        recipe2_data = response_data[1]
        self.assertEqual(recipe2_data["name"], recipe2.name)
        self.assertEqual(recipe2_data["description"], recipe2.description)

    def test_get_recipe_by_id(self):
        """
        Test GET response for recipe by id
        """
        recipe1 = Recipe.objects.create(
            name="Recipe 1",
            description="Recipe 1 description",
        )
        ingredient1 = Ingredient.objects.create(name="Ingredient 1")
        ingredient2 = Ingredient.objects.create(name="Ingredient 2")
        recipe1.ingredients.add(ingredient1)
        recipe1.ingredients.add(ingredient2)

        response = self.client.get(f"/recipes/{recipe1.id}/")
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(response_data["name"], recipe1.name)
        self.assertEqual(response_data["description"], recipe1.description)
        self.assertEqual(len(response_data["ingredients"]), 2)
        self.assertEqual(response_data["ingredients"][0]["name"], "Ingredient 1")
        self.assertEqual(response_data["ingredients"][1]["name"], "Ingredient 2")

    def test_get_recipe_by_id_not_found(self):
        """
        Test GET response for recipe by id not found
        """
        response = self.client.get("/recipes/1/")
        self.assertEqual(response.status_code, 404)

    def test_update_recipe_entire_date(self):
        """
        Test PATCH response for recipe entire data update
        """
        recipe1 = Recipe.objects.create(
            name="Recipe 1",
            description="Recipe 1 description",
        )
        ingredient1 = Ingredient.objects.create(name="Ingredient 1")
        ingredient2 = Ingredient.objects.create(name="Ingredient 2")
        recipe1.ingredients.add(ingredient1)
        recipe1.ingredients.add(ingredient2)

        patch_data = {
            "name": "Recipe 1 updated",
            "description": "Recipe 1 description updated",
            "ingredients": [
                {"name": "Ingredient 1 updated"},
                {"name": "Ingredient 2 updated"},
            ],
        }

        response = self.client.patch(
            f"/recipes/{recipe1.id}/",
            json.dumps(patch_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        print(response_data)
        self.assertEqual(response_data["name"], patch_data["name"])
        self.assertEqual(response_data["description"], patch_data["description"])
        self.assertEqual(len(response_data["ingredients"]), 2)
        self.assertEqual(
            response_data["ingredients"][0]["name"],
            patch_data["ingredients"][0]["name"],
        )
        self.assertEqual(
            response_data["ingredients"][1]["name"],
            patch_data["ingredients"][1]["name"],
        )

    def test_update_recipe_partial_data(self):
        """
        Test PATCH response for recipe partial data update
        """
        recipe1 = Recipe.objects.create(
            name="Recipe 1",
            description="Recipe 1 description",
        )

        patch_data = {
            "description": "Recipe 1 description updated",
        }

        response = self.client.patch(
            f"/recipes/{recipe1.id}/",
            json.dumps(patch_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(response_data["name"], recipe1.name)
        self.assertEqual(response_data["description"], patch_data["description"])

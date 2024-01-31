from django.test import TestCase
from recipes_book.models import Recipe, Ingredient
import json


class RecipeTest(TestCase):
    """
    Test module for Recipe model
    """

    def setUp(self) -> None:
        self.recipe_one = Recipe.objects.create(
            name="Frist Recipe",
            description="First Recipe description",
        )
        self.ingredient_one = Ingredient.objects.create(name="Some ingredient")
        self.ingredient_two = Ingredient.objects.create(name="Some other ingredient")
        self.recipe_one.ingredients.add(self.ingredient_one)
        self.recipe_one.ingredients.add(self.ingredient_two)

        self.recipe_two = Recipe.objects.create(
            name="Second Recipe",
            description="Second Recipe description",
        )
        self.ingredient_three = Ingredient.objects.create(
            name="Some really important ingredient"
        )
        self.ingredient_four = Ingredient.objects.create(
            name="Some not so important one"
        )
        self.recipe_two.ingredients.add(self.ingredient_three)
        self.recipe_two.ingredients.add(self.ingredient_four)

    def test_create_recipe_response(self):
        """
        Test POST response for recipe creation
        """
        posta_data = {
            "name": "Recipe created",
            "description": "Recipe created description",
            "ingredients": [
                {"name": "Ingredient created 1"},
                {"name": "Ingredient created 2"},
            ],
        }

        response = self.client.post(
            "/recipes/", json.dumps(posta_data), content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)

        response_data = response.json()
        self.assertEqual(response_data["name"], posta_data["name"])
        self.assertEqual(response_data["description"], posta_data["description"])
        self.assertEqual(len(response_data["ingredients"]), 2)

        saved_recipe = Recipe.objects.get(name=posta_data["name"])
        self.assertEqual(saved_recipe.description, posta_data["description"])
        self.assertEqual(saved_recipe.ingredients.count(), 2)

    def test_get_recipes(self):
        """
        Test GET response for recipe list
        """
        response = self.client.get("/recipes/")
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(len(response_data), 2)

        recipe1_data = response_data[0]
        self.assertEqual(recipe1_data["name"], self.recipe_one.name)
        self.assertEqual(recipe1_data["description"], self.recipe_one.description)
        self.assertEqual(len(recipe1_data["ingredients"]), 2)
        self.assertEqual(
            recipe1_data["ingredients"][0]["name"], self.ingredient_one.name
        )
        self.assertEqual(
            recipe1_data["ingredients"][1]["name"], self.ingredient_two.name
        )

        recipe2_data = response_data[1]
        self.assertEqual(recipe2_data["name"], self.recipe_two.name)
        self.assertEqual(recipe2_data["description"], self.recipe_two.description)

    def test_get_recipe_by_id(self):
        """
        Test GET response for recipe by id
        """
        response = self.client.get(f"/recipes/{self.recipe_one.id}/")
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(response_data["name"], self.recipe_one.name)
        self.assertEqual(response_data["description"], self.recipe_one.description)
        self.assertEqual(len(response_data["ingredients"]), 2)
        self.assertEqual(
            response_data["ingredients"][0]["name"], self.ingredient_one.name
        )
        self.assertEqual(
            response_data["ingredients"][1]["name"], self.ingredient_two.name
        )

    def test_get_recipe_by_id_not_found(self):
        """
        Test GET response for recipe by id not found
        """
        response = self.client.get("/recipes/1000/")
        self.assertEqual(response.status_code, 404)

    def test_update_recipe_entire_date(self):
        """
        Test PATCH response for recipe entire data update
        """
        patch_data = {
            "name": "Recipe 1 updated",
            "description": "Recipe 1 description updated",
            "ingredients": [
                {"name": "Ingredient 1 updated"},
                {"name": "Ingredient 2 updated"},
            ],
        }

        response = self.client.patch(
            f"/recipes/{self.recipe_one.id}/",
            json.dumps(patch_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
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
        patch_data = {
            "description": "Recipe 1 description updated",
        }

        response = self.client.patch(
            f"/recipes/{self.recipe_one.id}/",
            json.dumps(patch_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(response_data["name"], self.recipe_one.name)
        self.assertEqual(response_data["description"], patch_data["description"])

    def test_delete_recipe(self):
        """
        Test DELETE response for recipe
        """

        response = self.client.delete(f"/recipes/{self.recipe_one.id}/")
        self.assertEqual(response.status_code, 204)

        with self.assertRaises(Recipe.DoesNotExist):
            Recipe.objects.get(name=self.recipe_one.name)

        with self.assertRaises(Ingredient.DoesNotExist):
            Ingredient.objects.get(name=self.ingredient_two.name)

        with self.assertRaises(Ingredient.DoesNotExist):
            Ingredient.objects.get(name=self.ingredient_two.name)

    def test_filter_get_recipes_by_name(self):
        """
        Test GET response for recipe list filtered by name
        """
        response = self.client.get("/recipes/?name=Second")
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertEqual(len(response_data), 1)

        recipe2_data = response_data[0]
        self.assertEqual(recipe2_data["name"], self.recipe_two.name)
        self.assertEqual(recipe2_data["description"], self.recipe_two.description)

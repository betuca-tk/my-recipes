from django.db import models


class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"({self.id}) recipe: {self.name}. Description: {self.description}"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ingredients": [
                ingredient.to_dict() for ingredient in self.ingredients.all()
            ],
        }


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )

    def __str__(self):
        return f"({self.id}) name: {self.name}"

    def to_dict(self):
        return {
            "name": self.name,
        }

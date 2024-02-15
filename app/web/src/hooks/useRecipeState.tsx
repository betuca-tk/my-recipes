import { useState } from "react";
import { Recipe } from "../context/types";

const BLANK_RECIPE: Recipe = { name: "", description: "", ingredients: [] };

interface RecipeStateHookResult {
  recipe: Recipe;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  addIngredient: () => void;
  removeIngredient: (index: number) => void;
  updateIngredient: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  reset: () => void;
}

export default (): RecipeStateHookResult => {
  const BLANK_RECIPE: Recipe = { name: "", description: "", ingredients: [] };

  const [recipe, setRecipe] = useState(BLANK_RECIPE);
  const setName = (name: string) => {
    setRecipe({ ...recipe, name });
  };
  const setDescription = (description: string) => {
    setRecipe({ ...recipe, description });
  };
  const reset = () => {
    setRecipe(BLANK_RECIPE);
  };
  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...(prevRecipe.ingredients || []), { name: "" }],
    }));
  };
  const removeIngredient = (index: number) => {
    setRecipe((prevRecipe) => {
      const newIngredients = [...(prevRecipe.ingredients ?? [])];
      newIngredients.splice(index, 1);
      return {
        ...prevRecipe,
        ingredients: newIngredients,
      };
    });
  };
  const updateIngredient = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIngredients = [...(recipe.ingredients ?? [])];
    newIngredients[index].name = event.target.value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };
  return { recipe, setName, setDescription, addIngredient, removeIngredient, updateIngredient, reset };
};

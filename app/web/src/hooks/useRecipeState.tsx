import { useState } from "react";
import { Recipe } from "../context/types";

interface RecipeStateHookResult {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
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

const BLANK_RECIPE: Recipe = { name: "", description: "", ingredients: [] };

export default (): RecipeStateHookResult => {

  const [recipe, setState] = useState(BLANK_RECIPE);
  const setRecipe = (recipe: Recipe) => {
    setState(recipe);
  }
  const setName = (name: string) => {
    setState({ ...recipe, name });
  };
  const setDescription = (description: string) => {
    setState({ ...recipe, description });
  };
  const reset = () => {
    setState(BLANK_RECIPE);
  };
  const addIngredient = () => {
    setState((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...(prevRecipe.ingredients || []), { name: "" }],
    }));
  };
  const removeIngredient = (index: number) => {
    setState((prevRecipe) => {
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
    setState((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };
  return { recipe, setRecipe, setName, setDescription, addIngredient, removeIngredient, updateIngredient, reset };
};

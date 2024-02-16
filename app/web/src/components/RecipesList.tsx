import React, { useContext } from "react"
import RecipeItem from "./RecipeItem.tsx"
import { Recipe, RecipeActionTypes } from "../context/types.tsx";
import { removeRecipe } from "../context/RecipesService.tsx";
import { RecipeContext } from "../context/RecipeContext.tsx";

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = (props: RecipesListProps) => {

  const { dispatch } = useContext(RecipeContext);

  const handleDelete = async (id: number) => {
    console.log("removeRecipe: ", id)
    try {
      await removeRecipe(id.toString())
      dispatch({ type: RecipeActionTypes.DELETE_RECIPE, id });
    } catch (error) {
      dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
    }

  }

  const editRecipe = (id: number) => {
    console.log("editRecipe: ", id)
  }

  return (
    <div>
      {props.recipes.map((recipe) =>
        <>
          <RecipeItem key={recipe.id} {...recipe} />
          <button onClick={() => handleDelete(recipe.id)}>(X)</button>
          <button onClick={() => editRecipe(recipe.id)}>(Edit)</button>
        </>
      )}
    </div>
  )
}

export default RecipesList

import React, { useContext } from "react"
import RecipeItem from "./RecipeItem.tsx"
import { Recipe, RecipeActionTypes } from "../context/types.tsx";
import { removeRecipe } from "../context/RecipesService.tsx";
import { RecipeContext } from "../context/RecipeContext.tsx";
import { Link } from 'react-router-dom';

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

  return (
    <div>
      {props.recipes.map((recipe) =>
        <div key={recipe.id} >
          <RecipeItem {...recipe} />
          <button onClick={() => handleDelete(recipe.id)}>(X)</button>
          <Link to={`/update/${recipe.id}`}>Edit Recipe</Link>
        </div>
      )}
    </div>
  )
}

export default RecipesList

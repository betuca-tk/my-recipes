import React from "react"
import RecipeItem from "./RecipeItem.tsx"
import { Recipe } from "../context/types.tsx";

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = (props: RecipesListProps) => {
  return (
    <div>
      {props.recipes.map((recipe) =>
        <RecipeItem key={recipe.id} {...recipe} />
      )}
    </div>
  )
}

export default RecipesList

import React from "react"
import Recipe, { RecipeProps } from "./Recipe.tsx"
import { RecipeType } from "../context/types.tsx";

interface RecipesListProps {
  recipes: RecipeType[];
}

const RecipesList = (props: RecipesListProps) => {
  return (
    <div>
      <h1>Recipes</h1>
      {props.recipes.map((recipe) =>
        <Recipe key={recipe.id} {...recipe} />
      )}
    </div>
  )
}

export default RecipesList

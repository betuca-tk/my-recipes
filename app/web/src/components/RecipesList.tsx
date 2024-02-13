import React from "react"
import Recipe, { RecipeProps } from "./Recipe.tsx"

interface RecipesListProps {
  recipes: RecipeProps[];
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

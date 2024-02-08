import React, { Component } from "react"
import Recipe, { RecipeProps } from "./Recipe.tsx"

interface RecipesListProps {
  recipes: RecipeProps[];
}

class RecipesList extends Component<RecipesListProps> {
  render() {
    return (
      <div>
        <h1>Recipes</h1>
        {this.props.recipes.map((recipe) =>
          <Recipe key={recipe.id} {...recipe} />
        )}
      </div>
    )
  }
}

export default RecipesList

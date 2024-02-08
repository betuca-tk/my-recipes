import React, { Component } from "react"
import Recipe from './Recipe.tsx';
import RecipesList from './RecipesList.tsx';

class RecipesBook extends Component {
  render() {
    return (
      <div>
        <h1>Recipes Book</h1>
        <RecipesList />
        <Recipe />
      </div>
    )
  }
}

export default RecipesBook

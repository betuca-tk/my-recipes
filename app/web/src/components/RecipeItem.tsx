import React from "react"
import './RecipeItem.css';
import { Recipe } from "../context/types";
import { RecipeItemContainer, RecipeName, RecipeLabel } from "./Styles.tsx";

const RecipeItem = (props: Recipe) => {
  return (
    <RecipeItemContainer>
      <RecipeName>{props.name}</RecipeName>
      <p>
        <RecipeLabel>{props.description}</RecipeLabel>
      </p>
      {props.ingredients && (
        <ul>
          {props.ingredients.map((ingredient, index) =>
            <li key={index}>
              <RecipeLabel>{ingredient.name}</RecipeLabel>
            </li>
          )}
        </ul>
      )}
    </RecipeItemContainer>
  )
}

export default RecipeItem

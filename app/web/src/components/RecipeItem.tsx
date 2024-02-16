import React from "react"
import './RecipeItem.css';
import { Recipe } from "../context/types";

const RecipeItem = (props: Recipe) => {
  return (
    <div key={props.id} className="Recipe">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      {props.ingredients && (
        <ul>
          {props.ingredients.map((ingredient, index) =>
            <li key={index}>{ingredient.name}</li>
          )}
        </ul>
      )}
    </div >
  )
}

export default RecipeItem

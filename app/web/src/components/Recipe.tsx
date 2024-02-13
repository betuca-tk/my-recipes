import React from "react"
import './Recipe.css';

export interface RecipeProps {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

const Recipe = (props: RecipeProps) => {
  return (
    <div key={props.id} className="Recipe">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <ul>
        {props.ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
      </ul>
    </div>
  )
}

export default Recipe

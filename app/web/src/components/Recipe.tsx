import React from "react"
import './Recipe.css';
import { RecipeType } from "../context/types";

export interface RecipeProps {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

const Recipe = (props: RecipeType) => {
  return (
    <div key={props.id} className="Recipe">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      {/* <ul>
        {props.ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>
        })}
      </ul> */}
    </div>
  )
}

export default Recipe

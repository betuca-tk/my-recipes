import React from "react"
import './RecipeItem.css';
import { RecipeType } from "../context/types";

export interface RecipeProps {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

const RecipeItem = (props: RecipeType) => {
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

export default RecipeItem

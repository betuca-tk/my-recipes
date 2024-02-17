import React from "react"
import './RecipeItem.css';
import { Recipe } from "../context/types";
import styled from 'styled-components';

const RecipeItemContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px 10px 0px 10px;
  margin: 2px 2px 10px 2px;  
`;

const RecipeName = styled.label`
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
  padding-top: 15px;
`;

const RecipeDescription = styled.p`
  color: #666;
`;

const RecipeItem = (props: Recipe) => {
  return (
    <RecipeItemContainer>
      <RecipeName>{props.name}</RecipeName>
      <RecipeDescription>{props.description}</RecipeDescription>
      {props.ingredients && (
        <ul>
          {props.ingredients.map((ingredient, index) =>
            <li key={index}>{ingredient.name}</li>
          )}
        </ul>
      )}
    </RecipeItemContainer>
  )
}

export default RecipeItem

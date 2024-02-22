import React, { useContext } from "react"
import RecipeItem from "./RecipeItem.tsx"
import { Recipe, RecipeActionTypes } from "../context/types.tsx";
import { removeRecipe } from "../api/RecipesBEService.tsx";
import { RecipeContext } from "../context/RecipeContext.tsx";
import styled from 'styled-components';
import { StyledLink, RecipesListContainer, StyledRemoveLabel } from "./Styles.tsx";

const RecipesListSubContainer = styled.div`
    padding: 2px 2px 43px 2px;
    border: 1px solid #c48a8a;
    margin-bottom: 10px;
`;

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = (props: RecipesListProps) => {

  const { dispatch } = useContext(RecipeContext);

  const handleDelete = async (id: number) => {
    try {
      await removeRecipe(id.toString())
      dispatch({ type: RecipeActionTypes.DELETE_RECIPE, id });
    } catch (error) {
      dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
    }

  }

  return (
    <RecipesListContainer>
      {props.recipes.map((recipe) =>
        <RecipesListSubContainer key={recipe.id} >
          <RecipeItem {...recipe} />
          <StyledRemoveLabel onClick={() => handleDelete(recipe.id)}>
            Delete
          </StyledRemoveLabel>
          <StyledLink to={`/update/${recipe.id}`}>Edit</StyledLink>

        </RecipesListSubContainer>
      )}
    </RecipesListContainer>
  )
}

export default RecipesList

import React, { useContext } from "react"
import RecipeItem from "./RecipeItem.tsx"
import { Recipe, RecipeActionTypes } from "../context/types.tsx";
import { removeRecipe } from "../context/RecipesService.tsx";
import { RecipeContext } from "../context/RecipeContext.tsx";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLink } from "./Styles.tsx";

const RecipesListContainer = styled.div`
    margin: 10px auto;
    font-size: 15px;
    border: 1px solid #eeeeee;
    background-color: #f9f9f9;
    padding: 30px;
`;
const RecipesListSubContainer = styled.div`
    padding: 2px 2px 43px 2px;
    border: 1px solid #eeeeee;
    margin-bottom: 10px;
`;
const StyledLinkRemove = styled(StyledLink)`
    padding: 8px 16px;
`;


interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = (props: RecipesListProps) => {

  const { dispatch } = useContext(RecipeContext);

  const handleDelete = async (id: number) => {
    console.log("removeRecipe: ", id)
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
          <StyledLinkRemove>
            <label onClick={() => handleDelete(recipe.id)}>Delete</label>
          </StyledLinkRemove>
          <StyledLinkRemove to={`/update/${recipe.id}`}>Edit</StyledLinkRemove>

        </RecipesListSubContainer>
      )}
    </RecipesListContainer>
  )
}

export default RecipesList

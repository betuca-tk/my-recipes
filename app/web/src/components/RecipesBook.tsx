import React, { useEffect, useReducer, useContext } from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeActionTypes } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.tsx';
import styled from 'styled-components';
import { StyledLink } from './Styles.tsx';

const RecipesBookContainer = styled.div`
    margin: 10px auto;
    font-size: 15px;
    border: 1px solid #eeeeee;
    background-color: #f9f9f9;
    padding: 30px;
`;

const StyleTitle = styled.label`
    font-size: 40px;
    color: #333;`;

const StyledHeader = styled.div`
    margin-bottom: 20px;
`;
const StyledLinkAdd = styled(StyledLink)`
    padding: 8px 16px;
`;


const RecipesBook = () => {
    const { recipes, dispatch } = useContext(RecipeContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let payload = await getRecipes()
                dispatch({ type: RecipeActionTypes.FETCH_RECIPES, payload: payload });
            } catch (error) {
                dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
            }
        };
        fetchRecipes();
    }, []);

    return (
        <RecipesBookContainer>
            <StyledHeader>
                <StyleTitle>Recipes Book</StyleTitle>
                <StyledLinkAdd to="/add">Add Recipe</StyledLinkAdd>
            </StyledHeader>
            <RecipesList recipes={recipes} />
        </RecipesBookContainer>
    )
}

export default RecipesBook

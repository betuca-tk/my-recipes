import React, { useEffect, useContext } from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeActionTypes } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";
import { RecipeContext } from '../context/RecipeContext.tsx';
import { StyledLinkHeader, RecipesBookContainer, StyleTitle, StyledHeader } from './Styles.tsx';


const RecipesBook = () => {
    const { recipes, dispatch } = useContext(RecipeContext);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let payload = await getRecipes()
                // dispatch({ type: RecipeActionTypes.FETCH_RECIPES, payload: payload });
            } catch (error) {
                // dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
            }
        };
        fetchRecipes();
    }, [dispatch]);

    return (
        <RecipesBookContainer>
            <StyledHeader>
                <StyleTitle>Recipes Book</StyleTitle>
                <StyledLinkHeader to="/add">Add Recipe</StyledLinkHeader>
            </StyledHeader>
            <RecipesList recipes={recipes} />
        </RecipesBookContainer>
    )
}

export default RecipesBook

import React, { useContext } from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeContext } from '../context/RecipeContext.tsx';
import { StyledLinkHeader, RecipesBookContainer, StyleTitle, StyledHeader } from './Styles.tsx';


const RecipesBook = () => {
    const { recipes } = useContext(RecipeContext);

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

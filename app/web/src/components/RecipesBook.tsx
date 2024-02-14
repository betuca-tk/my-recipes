import React, { useEffect, useReducer } from "react"
import RecipesList from './RecipesList.tsx';
import recipeReducer from "../context/recipeReducer.tsx";
import { Recipe } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";
import { Link } from 'react-router-dom';

const RecipesBook = () => {
    const [recipes, dispatch] = useReducer(recipeReducer, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let payload = await getRecipes()
                dispatch({ type: 'FETCH_RECIPES', payload: payload });
            } catch (error) {
                dispatch({ type: 'ERROR', payload: "Something went wrong" });
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes Book</h1>
            <Link to="/add"><button>Add Recipe</button></Link>
            <RecipesList recipes={recipes} />
        </div>
    )
}

export default RecipesBook

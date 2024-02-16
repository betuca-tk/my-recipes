import React, { useEffect, useReducer, useContext } from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeActionTypes } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.tsx';

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
        <div>
            <h1>Recipes Book</h1>
            <Link to="/add"><button>Add Recipe</button></Link>
            <RecipesList recipes={recipes} />
        </div>
    )
}

export default RecipesBook

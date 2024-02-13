import React, { useEffect, useReducer } from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeProps } from "./Recipe.tsx";
import recipeReducer from "../context/recipeReducer.tsx";
import { RecipeType } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";

const DEFAULT_RECIPES: RecipeType[] = [
    {
        id: 1,
        name: "Spaghetti",
        description: "A simple recipe for spaghetti"
        // ingredients: ["spaghetti", "tomato sauce", "meatballs"]
    },
    {
        id: 2,
        name: "Tacos",
        description: "A simple recipe for tacos"
        // ingredients: ["tortillas", "ground beef", "lettuce", "tomato", "cheese"]
    },
    {
        id: 3,
        name: "Pizza",
        description: "A simple recipe for pizza"
        // ingredients: ["dough", "tomato sauce", "cheese", "pepperoni"]
    }
];


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
            <RecipesList recipes={recipes} />
        </div>
    )
}

export default RecipesBook

import React, { createContext, useReducer, useEffect } from 'react';
import recipeReducer from './recipeReducer.tsx';
import { Recipe, RecipeAction } from './types';
import { RecipeActionTypes } from "../context/types.tsx";
import { getRecipes } from "../context/RecipesService.tsx";

export interface RecipeContextInterface {
    recipes: Recipe[];
    dispatch: React.Dispatch<RecipeAction>;
}

export const initialState: RecipeContextInterface["recipes"] = [];

export const RecipeContext = createContext<RecipeContextInterface>({
    recipes: initialState,
    dispatch: () => { },
});


export const RecipeProvider = ({ children }) => {
    const [recipes, dispatch] = useReducer(recipeReducer, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let payload = await getRecipes()
                console.log("(on context) payload", payload);
                dispatch({ type: RecipeActionTypes.FETCH_RECIPES, payload: payload });
            } catch (error) {
                dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
            }
        };
        console.log("(on cotext) fetchRecipes");
        fetchRecipes();
    }, [dispatch]);

    return (
        <RecipeContext.Provider value={{ recipes, dispatch }}>
            {children}
        </RecipeContext.Provider>
    );
};
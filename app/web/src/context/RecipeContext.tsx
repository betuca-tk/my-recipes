import React, { createContext, useReducer } from 'react';
import recipeReducer from './recipeReducer.tsx';
import { Recipe, RecipeAction } from './types';

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

    return (
        <RecipeContext.Provider value={{ recipes, dispatch }}>
            {children}
        </RecipeContext.Provider>
    );
};
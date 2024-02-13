import React from "react"
import RecipesList from './RecipesList.tsx';
import { RecipeProps } from "./Recipe.tsx";

const DEFAULT_RECIPES: RecipeProps[] = [
    {
        id: "1",
        name: "Spaghetti",
        description: "A simple recipe for spaghetti",
        ingredients: ["spaghetti", "tomato sauce", "meatballs"]
    },
    {
        id: "2",
        name: "Tacos",
        description: "A simple recipe for tacos",
        ingredients: ["tortillas", "ground beef", "lettuce", "tomato", "cheese"]
    },
    {
        id: "3",
        name: "Pizza",
        description: "A simple recipe for pizza",
        ingredients: ["dough", "tomato sauce", "cheese", "pepperoni"]
    }
];


const RecipesBook = () => {
    return (
        <div>
            <h1>Recipes Book</h1>
            <RecipesList recipes={DEFAULT_RECIPES} />
        </div>
    )
}

export default RecipesBook

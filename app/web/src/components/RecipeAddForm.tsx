import React, { useReducer } from "react"
import './RecipeAddForm.css';
import useInputState from "../hooks/useInputState";
import recipeReducer from "../context/recipeReducer.tsx";
import { Link } from 'react-router-dom';
import { addRecipe } from "../context/RecipesService.tsx";
import { RecipeActionTypes } from "../context/types.tsx";

const RecipeAddForm = () => {

    const [name, handleNameChange] = useInputState("");
    const [description, handleDescriptionChange] = useInputState("");

    const [recipes, dispatch] = useReducer(recipeReducer, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submitting form values: ", name, " - ", description)
        try {
            let payload = await addRecipe({
                name: name,
                description: description,
                ingredients: []
            })
            dispatch({ type: RecipeActionTypes.ADD_RECIPE, payload: payload });
        } catch (error) {
            dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
        }

    }

    return (<div className="RecipeAddForm">
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Add new Recipe</h1>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={handleNameChange} type="text" />
            <label htmlFor="description">Description</label>
            <input id="description" type="text" value={description} onChange={handleDescriptionChange} />
            <button type="submit">add</button>
            <Link to="/"><button>back to home</button></Link>
        </form>
    </div>
    )
}

export default RecipeAddForm

import React from "react"
import './RecipeAddForm.css';
import useInputState from "../hooks/useInputState";
import { Link } from 'react-router-dom';

const RecipeAddForm = () => {

    const [name, handleNameChange] = useInputState("");
    const [description, handleDescriptionChange] = useInputState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submitting form values: ", name, " - ", description)
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

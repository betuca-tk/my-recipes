import React, { useContext, useEffect } from "react"
import './RecipeForm.css';
import useRecipeState from "../hooks/useRecipeState.tsx";
import { Link, useParams } from 'react-router-dom';
import { addRecipe, getRecipe, updateRecipe } from "../context/RecipesService.tsx";
import { RecipeActionTypes } from "../context/types.tsx";
import { withRouter, RouteComponentProps } from "react-router-dom"
import { RecipeContext } from "../context/RecipeContext.tsx";

interface RecipeFormProps extends RouteComponentProps { }

const RecipeForm: React.FC<RecipeFormProps> = (props) => {

    const { id } = useParams()

    console.log("(RecipeForm) props: ", props)

    const {
        recipe,
        setRecipe,
        setName,
        setDescription,
        addIngredient,
        removeIngredient,
        updateIngredient,
        reset
    } = useRecipeState();

    useEffect(() => {
        const fetchRecipe = async (id) => {
            try {
                let payload = await getRecipe(id)
                console.log("(RecipeForm) payload: ", payload)
                setRecipe(payload);
            } catch (error) {
                dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
            }
        };
        if (id) {
            fetchRecipe(id);
        }
    }, []);

    
    const { dispatch } = useContext(RecipeContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("(on submit) recipe: ", recipe)
        try {
            let payload
            if (props.actionType === RecipeActionTypes.ADD_RECIPE) {
                payload = await addRecipe(recipe)
            } else {
                payload = await updateRecipe(recipe)
            }
            dispatch({ type: props.actionType, payload: payload });
            reset();
            props.history.push("/");

        } catch (error) {
            dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
        }
    }

    return (<div className="RecipeAddForm">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                {props.actionType === RecipeActionTypes.ADD_RECIPE ? <h1>Add new Recipe</h1> : <h1>Edit Recipe</h1>}
                <label htmlFor="name">Name</label>
                <input id="name" value={recipe.name} onChange={(e) => setName(e.target.value)} type="text" />
                <label htmlFor="description">Description</label>
                <input id="description" type="text" value={recipe.description} onChange={(e) => setDescription(e.target.value)} />
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label htmlFor={`ingredient${index}`}>Ingredient</label>
                        <input
                            id={`ingredient${index}`}
                            value={ingredient.name}
                            type="text"
                            onChange={(e) => updateIngredient(index, e)}
                        />
                        <button onClick={() => removeIngredient(index)}>(X)</button>
                    </div>
                ))}
            </div>
            <div>
                <button type="button" onClick={() => addIngredient()}>Add Ingredient</button>
            </div>
            <button type="submit">add</button>
            <Link to="/"><button>back to home</button></Link>
        </form>
    </div>
    )
}

export default withRouter(RecipeForm)

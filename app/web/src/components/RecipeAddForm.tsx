import React, { useReducer } from "react"
import './RecipeAddForm.css';
import useRecipeState from "../hooks/useRecipeState.tsx";
import recipeReducer from "../context/recipeReducer.tsx";
import { Link } from 'react-router-dom';
import { addRecipe } from "../context/RecipesService.tsx";
import { RecipeActionTypes } from "../context/types.tsx";
import { withRouter, RouteComponentProps } from "react-router-dom"

interface RecipeFormProps extends RouteComponentProps {}

const RecipeAddForm: React.FC<RecipeFormProps> = ({ history }) => {

    const {
        recipe,
        setName,
        setDescription,
        addIngredient,
        removeIngredient,
        updateIngredient,
        reset
    } = useRecipeState();

    const [recipes, dispatch] = useReducer(recipeReducer, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("(on submit) recipe: ", recipe)
        try {
            let payload = await addRecipe(recipe)
            dispatch({ type: RecipeActionTypes.ADD_RECIPE, payload: payload });
            reset();
            history.push("/");

        } catch (error) {
            dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
        }
    }

    return (<div className="RecipeAddForm">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h1>Add new Recipe</h1>
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
                <button type="button" onClick={() => addIngredient("")}>Add Ingredient</button>
            </div>
            <button type="submit">add</button>
            <Link to="/"><button>back to home</button></Link>
        </form>
    </div>
    )
}

export default withRouter(RecipeAddForm)

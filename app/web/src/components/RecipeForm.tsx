import React, { useContext, useEffect } from "react"
import useRecipeState from "../hooks/useRecipeState.tsx";
import { useParams } from 'react-router-dom';
import { addRecipe, getRecipe, updateRecipe } from "../context/RecipesService.tsx";
import { RecipeActionTypes } from "../context/types.tsx";
import { withRouter, RouteComponentProps } from "react-router-dom"
import { RecipeContext } from "../context/RecipeContext.tsx";
import styled from 'styled-components';
import { StyledButton, RecipesListContainer, StyledLinkHeader, RecipesBookContainer, StyleTitle, StyledHeader } from './Styles.tsx';
import { RecipeItemContainer, RecipeName, RecipeLabel } from "./Styles.tsx";

const RecipesBookContainerAdd = styled(RecipesBookContainer)`
    padding-bottom: 45px;
`;
const StyledButtonIngredient = styled(StyledButton)`
    margin-top: 10px;
    float: none;
`;
const StyledButtonIngredientDelete = styled(StyledButton)`
    float: none;
`;

interface RecipeFormProps extends RouteComponentProps { }

const RecipeForm: React.FC<RecipeFormProps> = (props) => {

    const { id } = useParams()
    const { dispatch } = useContext(RecipeContext);

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
                setRecipe(payload);
            } catch (error) {
                dispatch({ type: RecipeActionTypes.ERROR, payload: "Something went wrong" });
            }
        };
        if (id) {
            fetchRecipe(id);
        }
    }, [dispatch, id, setRecipe]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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

    return (
        <RecipesBookContainerAdd>
            <StyledHeader>
                <StyleTitle>
                    {props.actionType === RecipeActionTypes.ADD_RECIPE ? "Add Recipe" : "Edit Recipe"}
                </StyleTitle>
                <StyledLinkHeader to="/">Back to Home</StyledLinkHeader>
            </StyledHeader>
            <form onSubmit={(e) => handleSubmit(e)}>
                <RecipesListContainer>

                    <RecipeItemContainer>
                        <RecipeName htmlFor="name">Name: </RecipeName>
                        <input id="name" value={recipe.name} onChange={(e) => setName(e.target.value)} type="text" />
                        <p>
                            <RecipeLabel htmlFor="name">Description: </RecipeLabel>
                            <input id="description" type="text" value={recipe.description} onChange={(e) => setDescription(e.target.value)} />
                        </p>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <p>
                                    <RecipeLabel htmlFor={`ingredient${index}`}>Ingredient: </RecipeLabel>
                                    <input id={`ingredient${index} `}
                                        value={ingredient.name}
                                        type="text"
                                        onChange={(e) => updateIngredient(index, e)} />
                                    <StyledButtonIngredientDelete type="button" onClick={() => removeIngredient(index)}>(x)</StyledButtonIngredientDelete>
                                </p>
                            </div>
                        ))}
                    </RecipeItemContainer>
                    <StyledButtonIngredient type="button" onClick={() => addIngredient()}>
                        Add Ingredient
                    </StyledButtonIngredient>
                </RecipesListContainer>
                <StyledButton type="submit">
                    Save
                </StyledButton>
            </form>
        </RecipesBookContainerAdd>
    )
}

export default withRouter(RecipeForm)

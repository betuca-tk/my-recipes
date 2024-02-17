import { Recipe, RecipeAction } from './types';


const recipeReducer = (state: Recipe[], action: RecipeAction): Recipe[] =>{
    switch (action.type) {
        case 'FETCH_RECIPES':
            return action.payload;
        case 'ADD_RECIPE':
            return [...state, action.payload];
        case 'UPDATE_RECIPE':
            return state.map((recipe) => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        ...action.payload
                    };
                } else {
                    return recipe;
                }
            });
        case 'DELETE_RECIPE':
            return state.filter((recipe) => recipe.id !== action.id);
        case 'ERROR':
            console.error('Error:', action.payload);
            return state;
        default:
            return state;
    }
}

export default recipeReducer;

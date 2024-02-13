import { Recipe, RecipeAction } from './types';


const recipeReducer = (state: Recipe[], action: RecipeAction): Recipe[] =>{
    switch (action.type) {
        case 'FETCH_RECIPES':
            return action.payload;
        case 'ERROR':
            console.error('Error:', action.payload);
            return state;
        default:
            return state;
    }
}

export default recipeReducer;

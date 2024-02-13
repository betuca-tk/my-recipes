import { RecipeType, RecipeAction } from './types';


const recipeReducer = (state: RecipeType[], action: RecipeAction): RecipeType[] =>{
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

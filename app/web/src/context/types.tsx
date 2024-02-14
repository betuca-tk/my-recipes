
export interface Recipe {
    id?: number;
    name: string;
    description: string;
    ingredients?: string[];
}

export enum RecipeActionTypes {
    FETCH_RECIPES = 'FETCH_RECIPES',
    ADD_RECIPE = 'ADD_RECIPE',
    ERROR = 'ERROR'
}

export type RecipeAction =
    | { type: RecipeActionTypes.FETCH_RECIPES; payload: Recipe[] }
    | { type: RecipeActionTypes.ADD_RECIPE; payload: Recipe }
    | { type: RecipeActionTypes.ERROR; payload: any };

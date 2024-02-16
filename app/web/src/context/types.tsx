
export interface Ingredient {
    name: string;
}

export interface Recipe {
    id?: number;
    name: string;
    description: string;
    ingredients?: Ingredient[];
}

export enum RecipeActionTypes {
    FETCH_RECIPES = 'FETCH_RECIPES',
    ADD_RECIPE = 'ADD_RECIPE',
    DELETE_RECIPE = 'DELETE_RECIPE',
    ERROR = 'ERROR'
}

export type RecipeAction =
    | { type: RecipeActionTypes.FETCH_RECIPES; payload: Recipe[] }
    | { type: RecipeActionTypes.ADD_RECIPE; payload: Recipe }
    | { type: RecipeActionTypes.DELETE_RECIPE; id: number }
    | { type: RecipeActionTypes.ERROR; payload: any };


export interface Recipe {
    id: number;
    name: string;
    description: string;
}

export type RecipeAction =
    | { type: 'FETCH_RECIPES'; payload: Recipe[] }
    | { type: 'ERROR'; payload: any };

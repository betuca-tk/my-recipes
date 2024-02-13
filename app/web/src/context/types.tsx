
export interface RecipeType {
    id: number;
    name: string;
    description: string;
}

export type RecipeAction =
    | { type: 'FETCH_RECIPES'; payload: RecipeType[] }
    | { type: 'ERROR'; payload: any };

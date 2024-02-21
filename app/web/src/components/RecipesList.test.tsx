import { render, screen, fireEvent } from '@testing-library/react';
import RecipesList from './RecipesList.tsx';
import React from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { MemoryRouter as Router } from 'react-router-dom';
import { removeRecipe } from '../context/RecipesService';
import { RecipeActionTypes } from '../context/types.tsx';

jest.mock('../context/RecipesService.tsx', () => ({
    removeRecipe: jest.fn(),
}));

const mockRecipes = [
    { id: 1, name: 'Recipe one', description: "something one" },
];

const externalDispatch = jest.fn();

describe("RecipeList", () => {
    let wraper;
    beforeEach(() => {
        wraper = render(
            <RecipeContext.Provider value={
                {
                    recipes: mockRecipes,
                    dispatch: externalDispatch
                }}>
                <Router>
                    <RecipesList recipes={mockRecipes} />
                </Router>
            </RecipeContext.Provider>
        )
    });

    afterEach(jest.resetAllMocks)

    mockRecipes.forEach(recipe => {
        it(`should render recipe ${recipe.name}`, () => {
            const recipeElement = screen.getByText(recipe.name);
            expect(recipeElement).toBeInTheDocument();
            const descriptionElement = screen.getByText(recipe.description);
            expect(descriptionElement).toBeInTheDocument();
        });
    })
    test('should triggers removeRecipe and dispatch when clicking in delete', async () => {
        const { getByText } = wraper;

        await fireEvent.click(getByText('Delete'));

        expect(removeRecipe).toHaveBeenCalledWith('1');

        expect(externalDispatch).toHaveBeenCalledTimes(1);
        expect(externalDispatch).toHaveBeenCalledWith({
            type: RecipeActionTypes.DELETE_RECIPE,
            id: 1,
        });
    });
});
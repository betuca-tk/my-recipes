import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesBook from './RecipesBook';
import { MemoryRouter as Router } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import RecipesList from './RecipesList';

jest.mock('../api/RecipesBEService.tsx');
jest.mock('./RecipesList.tsx');

const mockRecipes = [{ id: 1, name: 'Recipe 1', description: "something here 1" }, { id: 2, name: 'Recipe 2', description: "something here 2" }];
const mockDispatch = jest.fn();

describe('RecipesBook', () => {
    beforeEach(() => {
        render(
            <RecipeContext.Provider value={{ recipes: mockRecipes, dispatch: mockDispatch }}>
                <Router>
                    <RecipesBook />
                </Router>
            </RecipeContext.Provider>
        );
    });
    test('renders page general text', () => {
        const titleElement = screen.getByText('Recipes Book');
        expect(titleElement).toBeInTheDocument();
        const addRecipeElement = screen.getByText('Add Recipe');
        expect(addRecipeElement).toBeInTheDocument();
    });
    test('should pass list of recipes from context to the RecipesList"', async () => {
        expect(RecipesList.mock.calls);
        expect(RecipesList.mock.calls[0][0].recipes).toEqual(mockRecipes);
    });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { RecipeActionTypes } from '../context/types';
import { RecipeContext } from '../context/RecipeContext';
import { addRecipe, updateRecipe } from '../context/RecipesService';

jest.mock('../context/RecipesService.tsx', () => ({
    addRecipe: jest.fn().mockResolvedValue({ mock: 'data' }),
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

const mockDispatch = jest.fn();

function renderWithRouter(Component) {
    return render(
        <MemoryRouter>
            <RecipeContext.Provider value={{ dispatch: mockDispatch }}>
                {Component}
            </RecipeContext.Provider>
        </MemoryRouter>
    );
}

describe('RecipeForm', () => {
    let wraper;

    beforeEach(() => {
    });

    afterEach(jest.resetAllMocks);

    it('should submits the form to add a new recipe', async () => {
        renderWithRouter(<RecipeForm actionType={RecipeActionTypes.ADD_RECIPE} />);

        fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'New Recipe' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'New Recipe Description' } });

        fireEvent.click(screen.getByText('Add Ingredient'));
        fireEvent.change(screen.getByLabelText('Ingredient:'), { target: { value: 'Ingredient 1' } });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(addRecipe).toHaveBeenCalledWith({
                name: 'New Recipe',
                description: 'New Recipe Description',
                ingredients: [{ name: 'Ingredient 1' }]
            });
            expect(mockHistoryPush).toHaveBeenCalledWith('/');
        });
    });
});
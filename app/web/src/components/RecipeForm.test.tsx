import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { RecipeActionTypes } from '../context/types';
import { RecipeContext } from '../context/RecipeContext';
import { addRecipe, updateRecipe } from '../context/RecipesService';

jest.mock('../context/RecipesService');

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

const mockDispatch = jest.fn((arg) => { console.log('mocked dispatch: ', arg) });

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
        wraper = renderWithRouter(<RecipeForm actionType={RecipeActionTypes.ADD_RECIPE} />);

        const { getByLabelText, getByText } = wraper;

        fireEvent.change(getByLabelText('Name:'), { target: { value: 'New Recipe' } });
        fireEvent.change(getByLabelText('Description:'), { target: { value: 'New Recipe Description' } });

        fireEvent.click(getByText('Add Ingredient'));
        fireEvent.change(getByLabelText('Ingredient:'), { target: { value: 'Ingredient 1' } });

        fireEvent.submit(getByText('Save'));

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
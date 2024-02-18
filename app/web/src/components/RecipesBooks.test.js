
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RecipesBook from './RecipesBook';
import { RecipeContext } from '../context/RecipeContext';
import { RecipeActionTypes } from '../context/types';
import { getRecipes } from '../context/RecipesService';
import { jest } from '@jest/globals';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router


jest.mock('../context/RecipesService'); // Mock the RecipesService module

describe('RecipesBook component', () => {
    // Mock recipe data
    const recipes = [
        { id: 1, name: 'Recipe 1', description: 'Description 1' },
        { id: 2, name: 'Recipe 2', description: 'Description 2' },
    ];

    test('renders without crashing', () => {
        render(
            <Router>
                <RecipesBook />
            </Router>);
        // Add assertions as needed
    });

    // test('fetches recipes and dispatches FETCH_RECIPES action', async () => {
    //     getRecipes.mockResolvedValue(recipes); // Mock the resolved value of getRecipes
    //     const dispatch = jest.fn(); // Mock dispatch function

    //     render(
    //         <RecipeContext.Provider value={{ recipes: [], dispatch }}>
    //             <RecipesBook />
    //         </RecipeContext.Provider>
    //     );

    //     // Wait for fetchRecipes to be called and resolve
    //     await waitFor(() => {
    //         expect(dispatch).toHaveBeenCalledWith({
    //             type: RecipeActionTypes.FETCH_RECIPES,
    //             payload: recipes,
    //         });
    //     });
    // });

    // Add more tests as needed
});

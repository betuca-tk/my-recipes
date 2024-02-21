import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesBook from './RecipesBook';
import { MemoryRouter as Router } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext'; // Import RecipeContext

describe('RecipesBook', () => {
    beforeEach(() => {
        render(
            <Router>
                <RecipesBook />
            </Router>
        );
    });
    test('renders title "Recipes Book"', () => {
        const titleElement = screen.getByText('Recipes Book');
        expect(titleElement).toBeInTheDocument();
    });

    test('renders text "Add Recipe"', () => {
        const addRecipeElement = screen.getByText('Add Recipe');
        expect(addRecipeElement).toBeInTheDocument();
    });
});
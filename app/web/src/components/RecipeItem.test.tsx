import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeItem from './RecipeItem';

describe('RecipeItem', () => {
  const recipe = {
    name: 'Test Recipe',
    description: 'Test Description',
    ingredients: [
      { name: 'Ingredient 1' },
      { name: 'Ingredient 2' },
      { name: 'Ingredient 3' },
    ],
  };

  test('renders recipe name', () => {
    render(<RecipeItem {...recipe} />);
    const recipeNameElement = screen.getByText('Test Recipe');
    expect(recipeNameElement).toBeVisible();
  });

  test('renders recipe description', () => {
    render(<RecipeItem {...recipe} />);
    const recipeDescriptionElement = screen.getByText('Test Description');
    expect(recipeDescriptionElement).toBeVisible();
  });

  test('renders each ingredient', () => {
    render(<RecipeItem {...recipe} />);
    const ingredientElements = screen.getAllByRole('listitem');
    expect(ingredientElements).toHaveLength(3); // Assuming there are 3 ingredients
    expect(ingredientElements[0]).toHaveTextContent('Ingredient 1');
    expect(ingredientElements[1]).toHaveTextContent('Ingredient 2');
    expect(ingredientElements[2]).toHaveTextContent('Ingredient 3');
  });
});

import React from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { Recipe } from '../global/recipe.types';

const SavedRecipes = () => {
  const recipes: Recipe[] = [
    {
      recipeName: 'Chicken Curry',
      instructions: ['1. Cook', '2. Chicken'],
      ingredients: ['chicken'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
    {
      recipeName: 'Potato Curry',
      instructions: ['1. Cook', '2. Potato'],
      ingredients: ['potato'],
    },
  ];

  return (
    <div className='container p-5'>
      <h1 className='text-3xl font-bold mr-2'>Saved Recipes</h1>
      {recipes.map((recipe, i) => (
        <div className='m-2'>
          <RecipeCard></RecipeCard>
        </div>
      ))}
    </div>
  );
};

export default SavedRecipes;

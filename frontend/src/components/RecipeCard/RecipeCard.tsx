import React, { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from '../BookmarkButton/BookmarkButton';
import SolidBookmark from '../Icons/SolidBookmark';
import { Recipe } from '../IngredientBar/types';
import { useMutation } from '@tanstack/react-query';
import { deleteRecipe } from './util';

type Props = {
  recipe: Recipe;
  recipes: Recipe[];
  setRecipes: React.Dispatch<SetStateAction<Recipe[]>>;
};
const RecipeCard = ({ recipe, recipes, setRecipes }: Props) => {
  const mutation = useMutation({
    mutationFn: deleteRecipe,
  });
  const unsaveRecipe = (recipeId: number) => {
    let updatedRecipes = recipes.filter(
      (recipe) => recipe.recipeId !== recipeId,
    );
    setRecipes(updatedRecipes);
    mutation.mutate(recipeId);
  };
  return (
    <div className='card w-full bg-base-100 shadow-md'>
      <div className='card-body'>
        <div className='card-title justify-between'>
          <Link
            className='underline hover:text-purple-900'
            to='/recipe'
            state={{ recipe, fillButton: true }}
          >
            <h2>{recipe.recipeName}</h2>
          </Link>
          <button className='btn btn-ghost btn-sm text-yellow-600'>
            <BookmarkButton
              handleClick={() => unsaveRecipe(recipe.recipeId || -1)}
              solid={true}
              disable={false}
            />
          </button>
        </div>
        <p>{recipe.ingredients.join(', ')}</p>
      </div>
    </div>
  );
};

export default RecipeCard;

import React from 'react';
import { Link } from 'react-router-dom';
import SolidBookmark from '../Icons/SolidBookmark';
import { Recipe } from '../IngredientBar/types';

type Props = {
  recipe: Recipe;
};
const RecipeCard = ({ recipe }: Props) => {
  const toggleSave = () => { };
  return (
    <div className='card w-full bg-base-100 shadow-md'>
      <div className='card-body'>
        <div className='card-title justify-between'>
          <Link
            className='underline hover:text-purple-900'
            to='/recipe'
            state={{ recipe }}
          >
            <h2>{recipe.recipeName}</h2>
          </Link>
          <button className='btn btn-ghost btn-sm text-yellow-600'>
            <SolidBookmark />
          </button>
        </div>
        <p>{recipe.ingredients.join(', ')}</p>
      </div>
    </div>
  );
};

export default RecipeCard;

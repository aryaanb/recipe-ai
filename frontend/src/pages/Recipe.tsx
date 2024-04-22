import React from 'react';
import { useLocation } from 'react-router';
import { Recipe } from '../components/IngredientBar/types';

const RecipePage = () => {
  const location = useLocation();
  const recipe: Recipe = location.state?.recipe || {};

  return (
    <div className='m-2 flex flex-col items-center justify-center'>
      <div className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold mr-2'>{recipe?.recipeName}</h1>
          <button
            className='btn btn-square btn-ghost border-none hover:bg-teal-50'
            title='Save Recipe'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-yellow-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M5 2a2 2 0 0 0-2 2v14l7-3 7 3V4a2 2 0 0 0-2-2H5zm0 2h10v12l-5-2.18L5 16V4z' />
            </svg>
          </button>
        </div>
        <ul className='overflow-y-auto'>
          {recipe?.instructions.map((instruction, index) => (
            <li
              key={index}
              className='p-3 text-lg text-gray-800 bg-amber-100 mb-2'
            >
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;

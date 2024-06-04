import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton';
import { Recipe } from '../../global/recipe.types';
import { saveRecipe } from './util';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../global/context.types';

const RecipePage = () => {
  const location = useLocation();
  const recipe: Recipe = location.state?.recipe || {};
  const { user, loggedIn } = useContext(UserContext) as UserContextType;

  const [fillButton, setFillButton] = useState(
    location.state?.fillButton || false,
  );

  const mutation = useMutation({
    mutationFn: saveRecipe,
  });

  const handleClick = () => {
    const body = {
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      recipeName: recipe.recipeName,
      userEmail: user?.email ?? '',
    };
    mutation.mutate(body);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setFillButton(true);
    }
  }, [mutation.isSuccess]);

  return (
    <div className='m-2 flex flex-col items-center justify-center'>
      <div className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold mr-2'>{recipe?.recipeName}</h1>
          <BookmarkButton
            handleClick={handleClick}
            solid={fillButton}
            disable={!loggedIn}
          />
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

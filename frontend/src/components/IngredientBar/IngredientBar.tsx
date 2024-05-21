import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../Spinner/Spinner';
import { Recipe, RecipePostBody } from './types';
import { postIngredients } from './util';
import IngredientList from './IngredientList';
import ProfileSelect from './ProfileSelect';
import { useMutation } from '@tanstack/react-query';
import ErrorAlert from '../Alerts/ErrorAlert';

const IngredientBar = () => {
  // State to store the list of ingredients
  const [ingredients, setIngredients] = useState<string[]>([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState<string>('');

  const [error, setError] = useState<string>(''); // State to handle error
  const [profile, setProfile] = useState<string>(
    'Select a recipe assistant...',
  ); // State to handle error
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postIngredients,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const handleClick = () => {
    let postBody: RecipePostBody = {
      ingredients: ingredients,
      assistantProfile: profile,
    };
    mutation.mutate(postBody);
  };

  useEffect(() => {
    const triggerError = (message: string) => {
      setError(message);
      clearError();
    };

    if (mutation.isError) {
      triggerError('An error occurred. Please try again.');
    }
    if (mutation.isSuccess) {
      const recipe: Recipe = mutation.data;
      if (recipe?.ingredients.length > 0) {
        navigate('/recipe', { state: { recipe } });
      } else if (recipe?.instructions.length === 0) {
        triggerError('An error occurred. Please try again.');
      }
    }
  }, [mutation.data, mutation.isError, mutation.isSuccess, navigate]);

  if (mutation.isPending) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to handle (adding ingredient to the list)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const capitalizedInput = capitalizeFirstLetter(inputValue.trim());
      setIngredients([...ingredients, capitalizedInput]);
      setInputValue(''); // Reset input value after adding ingredient
    }
  };

  return (
    <div className='p-5 flex flex-col' style={{ height: 'calc(100vh - 4rem)' }}>
      <form onSubmit={handleSubmit} className='m-3'>
        <ProfileSelect setProfile={setProfile} />
        <input
          type='text'
          placeholder='Enter Ingredients'
          className='input input-bordered w-full'
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      </form>
      <IngredientList
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
      <button
        onClick={handleClick}
        className='btn btn-success text-white m-3'
        disabled={
          ingredients.length === 0 || profile === 'Select a recipe assistant...'
        }
      >
        Get Recipe
      </button>
      {/* Error Alert */}
      {error !== '' && <ErrorAlert error={error} />}
    </div>
  );
};

export default IngredientBar;

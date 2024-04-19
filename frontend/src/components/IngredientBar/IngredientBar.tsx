import React, { useEffect, useState } from 'react';
import { StopIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import Spinner from '../Spinner';
import { Recipe } from './types';
import { postIngredients } from './util';
import IngredientList from './IngredientList';

const IngredientBar = () => {
  // State to store the list of ingredients
  const [ingredients, setIngredients] = useState<string[]>([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>({
    ingredients: [],
    instructions: [],
    recipeName: '',
  });

  const [error, setError] = useState<string | null>(null); // State to handle error
  const [sentRequest, setSentRequest] = useState(false);
  const navigate = useNavigate();

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const sendIngredients = async () => {
    setIsLoading(true);
    setSentRequest(true);
    try {
      let data = await postIngredients(ingredients);
      setRecipe(data);
    } catch (error) {
      setError('An error occurred. Please try again.');
      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recipe?.instructions.length > 0) {
      navigate('/recipe', { state: { recipe } });
    } else if (recipe?.instructions.length === 0 && sentRequest) {
      setError('An error occurred. Please try again.');
      clearError();
      setSentRequest(false);
      setRecipe({ ingredients: [], instructions: [], recipeName: '' });
    }
  }, [navigate, sentRequest, recipe]);

  const handleClick = async () => {
    await sendIngredients();
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to handle form submission (adding ingredient to the list)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const capitalizedInput = capitalizeFirstLetter(inputValue.trim());
      setIngredients([...ingredients, capitalizedInput]);
      setInputValue(''); // Reset input value after adding ingredient
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='p-5 flex flex-col' style={{ height: 'calc(100vh - 4rem)' }}>
      <form onSubmit={handleSubmit} className='m-3'>
        <input
          type='text'
          placeholder='Enter Ingredients'
          className='input input-bordered w-full'
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      <IngredientList
        setIngredients={setIngredients}
        ingredients={ingredients}
      />
      <button
        onClick={handleClick}
        className='btn btn-success text-white m-3'
        disabled={ingredients.length === 0}
      >
        Submit Ingredients
      </button>
      {/* Error Alert */}
      {error && (
        <div className='alert alert-error' role='alert'>
          {error}
        </div>
      )}
    </div>
  );
};

export default IngredientBar;

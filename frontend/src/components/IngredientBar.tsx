import React, { useEffect, useState } from 'react';
import { StopIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import Spinner from './Spinner';

const IngredientBar = () => {
  // State to store the list of ingredients
  const [ingredients, setIngredients] = useState<string[]>([]);
  // State to store the current input value
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const postIngredients = async () => {
    setIsLoading(true);
    const url = '/api/recipeAssistant';
    const data = {
      ingredients: ingredients.join(', '),
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setInstructions(responseData?.instructions);
      // Do something with responseData if needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  useEffect(() => {
    if (instructions.length > 0) {
      setIsLoading(false);
      navigate('/recipe', { state: { instructions } });
    }
  }, [navigate, instructions]);

  const handleClick = async () => {
    await postIngredients();
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
      <div className='shadow-xl container flex-1 overflow-y-auto'>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index} className='prose prose-lg flex items-center m-1'>
              <StopIcon className='h-6 w-6 text-teal-500 mr-2' />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleClick}
        className='btn btn-success text-white m-3'
        disabled={ingredients.length === 0}
      >
        Submit Ingredients
      </button>
    </div>
  );
};

export default IngredientBar;

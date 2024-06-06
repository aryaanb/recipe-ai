import React, { SetStateAction } from 'react';
import { StopIcon } from '@heroicons/react/24/outline';

type Props = {
  ingredients: string[];
  setIngredients: React.Dispatch<SetStateAction<string[]>>;
};
const IngredientList = ({ ingredients, setIngredients }: Props) => {
  const deleteItem = (index: number) => {
    let res = ingredients.filter((_, i) => i !== index);
    setIngredients(res);
  };
  return (
    <div className='shadow-xl container flex-1 overflow-y-auto'>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className='flex flex-row items-center m-1 justify-between'
          >
            <div className='flex flex-row items-center '>
              <StopIcon className='h-6 w-6 text-teal-500 mr-2 ' />
              {ingredient}
            </div>
            <button
              onClick={() => deleteItem(index)}
              className='btn btn-sm btn-ghost btn-circle hover:bg-red-100  outline-none text-red-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button > 
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default IngredientList;

import React from 'react';
import { useLocation } from 'react-router';

const Recipe = () => {
  const location = useLocation();
  const instructions: string[] = location.state?.instructions || [];

  return (
    <div className='m-2 flex flex-col items-center justify-center  '>
      <div className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-4'>Recipe Instructions</h1>
        <ul className='overflow-y-auto'>
          {instructions.map((instruction, index) => (
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

export default Recipe;

import React from 'react';
import SolidBookmark from '../Icons/SolidBookmark';

const RecipeCard = () => {
  return (
    <div className='card w-full bg-base-100 shadow-md'>
      <div className='card-body'>
        <div className='card-title justify-between'>
          <h2>Cookies!</h2>
          <button className='btn btn-ghost btn-sm text-yellow-600'>
            <SolidBookmark />
          </button>
        </div>
        <p>We are using cookies for no reason.</p>
      </div>
    </div>
  );
};

export default RecipeCard;

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar bg-teal-400 flex flex-row justify-between'>
      <Link to='/' className='btn btn-ghost text-xl'>
        RecipeAI
      </Link>
      <Link to='/' className='btn btn-ghost text-xl' title='Saved Recipes'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-yellow-500'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M5 2a2 2 0 0 0-2 2v14l7-3 7 3V4a2 2 0 0 0-2-2H5zm0 2h10v12l-5-2.18L5 16V4z' />
        </svg>
      </Link>
    </div>
  );
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';

const NavBar = () => {
  return (
    <div className='navbar bg-teal-400 flex flex-row justify-between'>
      <Link to='/' className='btn btn-ghost text-xl'>
        RecipeAI
      </Link>
      <Link to='/' title='Saved Recipes'>
        <MenuDropdown></MenuDropdown>
      </Link>
    </div>
  );
};

export default NavBar;

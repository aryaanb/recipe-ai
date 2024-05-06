import React from 'react';
import { Link } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';

const NavBar = () => {
  return (
    <div className='navbar bg-teal-400 flex flex-row justify-between'>
      <Link to='/' className='btn btn-ghost text-xl'>
        RecipeAI
      </Link>
      <MenuDropdown></MenuDropdown>
    </div>
  );
};

export default NavBar;

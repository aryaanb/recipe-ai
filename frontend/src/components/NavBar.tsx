import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar bg-teal-400'>
      <Link to='/' className='btn btn-ghost text-xl'>
        RecipeAI
      </Link>
    </div>
  );
};

export default NavBar;

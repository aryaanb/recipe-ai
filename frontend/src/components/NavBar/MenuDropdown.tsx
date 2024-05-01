import React from 'react';
import LoginButtons from '../LoginButtons/LoginButtons';

const MenuDropdown = () => {
  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost m-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu  p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <a>Saved</a>
        </li>
        <li>
          <LoginButtons />
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;

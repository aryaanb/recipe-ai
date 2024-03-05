import React from 'react';

const Spinner = () => {
  return (
    <div
      className='text-teal-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
      role='status'
    ></div>
  );
};

export default Spinner;

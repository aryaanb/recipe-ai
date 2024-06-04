import React from 'react';
import OutlineBookmark from '../Icons/OutlineBookmark';
import SolidBookmark from '../Icons/SolidBookmark';

type Props = {
  solid: boolean;
  handleClick: React.MouseEventHandler;
  disable: boolean;
};

const BookmarkButton = ({ solid, disable, handleClick }: Props) => {
  return (
    <button
      className='btn btn-square btn-ghost border-none text-yellow-600 hover:bg-teal-50'
      title='Save Recipe'
      onClick={handleClick}
      disabled={disable}
    >
      {solid ? <SolidBookmark /> : <OutlineBookmark />}
    </button>
  );
};

export default BookmarkButton;

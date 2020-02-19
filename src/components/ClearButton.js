import React from 'react';

export const ClearButton = props => {
  const { onClick } = props;

  const handleButtonClick = () => onClick();

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleButtonClick}
    >
      Clear completed
    </button>
  );
};

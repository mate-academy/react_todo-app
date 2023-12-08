import React from 'react';

const CloseButton: React.FC = () => {
  return (
    <button
      type="button"
      className="destroy"
      data-cy="deleteTodo"
      aria-label="Delete Todo"
    />
  );
};

export default CloseButton;

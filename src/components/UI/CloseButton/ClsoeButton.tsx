import React from 'react';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="destroy"
      data-cy="deleteTodo"
      aria-label="Delete Todo"
      onClick={onClick}
    />
  );
};

export default CloseButton;

import React from 'react';
import { useTodo } from '../../hooks/useTodo';

export const TodoClearButton: React.FC = () => {
  const { items, setItems } = useTodo();

  const handleButtonClick = () => {
    const notComplitedItems = items.filter(item => !item.completed);

    setItems(notComplitedItems);
  };

  return (
    <button
      className="clear-completed"
      type="button"
      onClick={handleButtonClick}
    >
      Clear completed
    </button>
  );
};

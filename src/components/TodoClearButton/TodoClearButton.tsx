import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext/TodoContext';

export const TodoClearButton: React.FC = () => {
  const { items, setItems } = useContext(TodoContext);

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

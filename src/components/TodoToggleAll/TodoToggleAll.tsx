import React from 'react';
import { useTodo } from '../../hooks/useTodo';
import { Todo } from '../../types/Todo';

export const TodoToggleAll: React.FC = () => {
  const { items, setItems } = useTodo();
  const isNotCompleted = items.some(item => !item.completed);

  const handleInputChange = () => {
    if (isNotCompleted) {
      const newItems = items.map(item => {
        if (!item.completed) {
          const newItem: Todo = {
            ...item,
            completed: true,
          };

          return newItem;
        }

        return item;
      });

      setItems(newItems);
    } else {
      const newItems = items.map(item => {
        const newItem: Todo = {
          ...item,
          completed: false,
        };

        return newItem;
      });

      setItems(newItems);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleInputChange}
      />
      <label htmlFor="toggle-all">
        Mark all todos as complete
      </label>
    </>
  );
};

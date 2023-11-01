import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const ClearCompletedButton: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClear = () => {
    const modifiedTodos = todos.filter(todo => !todo.completed);

    setTodos(modifiedTodos);
  };

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleClear}
    >
      Clear completed
    </button>
  );
};

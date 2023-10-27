import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const ClearCompletedButton: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClearCompleted = () => {
    const modifiedTodos = todos.filter(todo => !todo.completed);

    setTodos(modifiedTodos);
  };

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleClearCompleted}
    >
      Clear completed
    </button>
  );
};

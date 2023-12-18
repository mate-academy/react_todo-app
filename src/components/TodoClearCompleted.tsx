import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

type PropsTodoClearCompleted = {
};

export const TodoClearCompleted: React.FC<PropsTodoClearCompleted> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const handleDeleteCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleDeleteCompleted}
    >
      Clear completed
    </button>
  );
};

import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

type Props = {
};

export const TodoClearCompleted: React.FC<Props> = () => {
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

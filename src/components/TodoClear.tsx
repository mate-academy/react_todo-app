import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

export const TodoClear = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const handleCompletedDeleteClick = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleCompletedDeleteClick}
    >
      Clear completed
    </button>
  );
};

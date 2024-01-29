import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

export const TodoClear: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const handleCompletedDeleteClick = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (todos.filter(todo => todo.completed).length > 0) {
    return (
      <button
        type="button"
        className="clear-completed"
        onClick={handleCompletedDeleteClick}
      >
        Clear completed
      </button>
    );
  }

  return null;
};

import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

export const TodoClear: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const handleCompletedDeleteClick = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <>
      {
        todos.filter(todo => todo.completed).length > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleCompletedDeleteClick}
          >
            Clear completed
          </button>
        )
      }
    </>
  );
};

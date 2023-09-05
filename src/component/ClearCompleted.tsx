import { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const ClearCompleted = () => {
  const todosContext = useContext(TodosContext);
  const { deleteCompletedTodos } = todosContext;

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={deleteCompletedTodos}
    >
      Clear completed
    </button>
  );
};

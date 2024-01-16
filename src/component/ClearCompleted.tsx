import { useTodos } from './TodosContext';

export const ClearCompleted = () => {
  const { deleteCompletedTodos } = useTodos();

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

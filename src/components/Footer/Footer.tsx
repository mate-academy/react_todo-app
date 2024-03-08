import { useCallback, useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../TodosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const uncompletedTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'clearCompleted' });
  }, [dispatch]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {uncompletedTodos > 1
          ? `${uncompletedTodos} items left`
          : `${uncompletedTodos} item left`}
      </span>

      <TodosFilter />

      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

import { useContext, useMemo } from 'react';
import { DispatchContext, TodosContext } from '../../store';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const uncompletedTodos = useMemo(() => todos.reduce((total, todo) => {
    if (!todo.completed) {
      return total + 1;
    }

    return total;
  }, 0), [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {!!todos.length
          && (
            uncompletedTodos === 1
              ? '1 item left'
              : `${uncompletedTodos} items left`
          )}
      </span>

      <TodosFilter />

      {uncompletedTodos !== todos.length
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => dispatch({ type: 'delete-completed' })}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};

import React, { useContext, useCallback } from 'react';
import { TodoContext } from './TodoContext';
import { TodoStatus } from '../types/TodoStatus';

export const TodoFooter: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  const hasCompletedTodos = state.todos.some(todo => todo.completed);

  const handleFilterClick = useCallback(
    (status: TodoStatus) => (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch({ type: 'SET_FILTER', filter: status });
    },
    [dispatch],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

  if (state.todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {state.todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {(Object.values(TodoStatus) as TodoStatus[]).map(status => (
          <a
            key={status}
            href={
              status !== TodoStatus.All ? `#/${status.toLowerCase()}` : '#/'
            }
            className={`filter__link ${state.filter === status ? 'selected' : ''}`}
            data-cy={`FilterLink${status}`}
            onClick={handleFilterClick(status)}
          >
            {status}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className={`todoapp__clear-completed ${hasCompletedTodos ? 'todoapp__clear-completed--active' : ''}`}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

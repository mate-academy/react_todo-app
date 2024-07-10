import React, { useCallback, useContext, useMemo } from 'react';
import { TodosStateContext } from '../providers/TodosProvider';
import { TodoStatus, TodoStatusRoutes } from '../types/Todo';
import classNames from 'classnames';

export const Footer = () => {
  const { state, dispatch } = useContext(TodosStateContext);
  const { todos, filterByStatus } = state;

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const selectStatus = useCallback(
    (status: TodoStatus) => {
      dispatch({ type: 'changeStatusFiltering', payload: status });
    },
    [dispatch],
  );

  const removeAllCompletedTodos = useCallback(
    () =>
      todos
        .filter(todo => todo.completed)
        .forEach(todo =>
          dispatch({ type: 'remove', payload: { id: todo.id } }),
        ),
    [dispatch, todos],
  );

  const completedTodosCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.keys(TodoStatusRoutes).map(status => (
          <a
            key={status}
            href={`#${TodoStatusRoutes[status as TodoStatus]}`}
            className={classNames('filter__link', {
              selected: filterByStatus === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => selectStatus(status as TodoStatus)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
        onClick={removeAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

import { useMemo } from 'react';
import cn from 'classnames';

import { useDispatch, useStore } from '../../store';
import { DELETE_TODO, UPDATE_FILTER } from '../../utils/actionTypes';
import { Filter } from '../../types/common';

export const Footer = () => {
  const { todos, filter } = useStore();
  const dispatch = useDispatch();

  const activeTodosQty = useMemo(
    () => todos.filter(({ completed }) => !completed)?.length || 0,
    [todos],
  );

  const completedTodosQty = useMemo(
    () => todos.filter(({ completed }) => completed)?.length || 0,
    [todos],
  );

  const onDeleteCompletedTodos = () => [
    todos.forEach(({ id, completed }) => {
      if (completed) {
        dispatch({ type: DELETE_TODO, payload: { id } });
      }
    }),
  ];

  const onFilterChange = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const newFilter = (event.target as HTMLAnchorElement).getAttribute(
      'data-filter',
    ) as Filter;

    dispatch({ type: UPDATE_FILTER, payload: { filter: newFilter } });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosQty} items left`}
      </span>

      <nav className="filter" data-cy="Filter" onClick={onFilterChange}>
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === 'all',
          })}
          data-filter="all"
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === 'active',
          })}
          data-filter="active"
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          data-filter="completed"
        >
          Completed
        </a>
      </nav>

      {!!completedTodosQty && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onDeleteCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

import React from 'react';
import { useDispatch, useGlobalState } from '../../GlobalProvider';
import { FilterCriteria } from '../../types/FilterCriteria';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, selectedFilter } = useGlobalState();
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch({ type: 'setIsFocused', payload: { isFocusNeed: true } });
    todos.forEach(todo => {
      if (todo.completed) {
        dispatch({
          type: 'deleteTodo',
          payload: { todo: todo },
        });
      }
    });
  };

  const handleFilter = (
    filterCriteria: FilterCriteria,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (selectedFilter === filterCriteria) {
      return;
    }

    dispatch({ type: 'setFilterCriteria', payload: { filterCriteria } });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => todo.completed === false).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterCriteria.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={event => handleFilter(FilterCriteria.ALL, event)}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterCriteria.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={event => handleFilter(FilterCriteria.ACTIVE, event)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterCriteria.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => handleFilter(FilterCriteria.COMPLETED, event)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.filter(todo => todo.completed === true).length}
        onClick={handleClear}
      >
        Clear completed
      </button>
    </footer>
  );
};

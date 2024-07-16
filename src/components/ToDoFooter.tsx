import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './StateContext';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

export const ToDoFooter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter, todos } = useContext(StateContext);

  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosLength} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => {
            dispatch({
              type: 'FILTER_TODOS',
              filteredOptions: FilterType.ALL,
            });
          }}
          className={classNames('filter__link', {
            selected: filter === FilterType.ALL,
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => {
            dispatch({
              type: 'FILTER_TODOS',
              filteredOptions: FilterType.ACTIVE,
            });
          }}
          className={classNames('filter__link', {
            selected: filter === FilterType.ACTIVE,
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterType.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            dispatch({
              type: 'FILTER_TODOS',
              filteredOptions: FilterType.COMPLETED,
            });
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={todos.length === activeTodosLength}
        data-cy="ClearCompletedButton"
        onClick={() => {
          dispatch({
            type: 'REMOVE_COMPLETED',
          });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

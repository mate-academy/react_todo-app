import classNames from 'classnames';
import { FILTERS } from '../constants/filters';
import { useContext } from 'react';
import type React from 'react';
import { TodoContext } from '../context/TodoContext';

export const Filter: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { state, dispatch } = context;

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: state.filter === FILTERS.all,
        })}
        onClick={event => {
          event.preventDefault();

          dispatch({
            type: 'setFilter',
            payload: FILTERS.all,
          });
        }}
        data-cy="FilterLinkAll"
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: state.filter === FILTERS.active,
        })}
        onClick={event => {
          event.preventDefault();

          dispatch({
            type: 'setFilter',
            payload: FILTERS.active,
          });
        }}
        data-cy="FilterLinkActive"
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: state.filter === FILTERS.completed,
        })}
        onClick={event => {
          event.preventDefault();

          dispatch({
            type: 'setFilter',
            payload: FILTERS.completed,
          });
        }}
        data-cy="FilterLinkCompleted"
      >
        Completed
      </a>
    </nav>
  );
};

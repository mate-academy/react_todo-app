import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import classNames from 'classnames';

export const FilterTodos: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { filterStatus } = useContext(StateContext);
  const setFilterStatus = (status: string) => {
    dispatch({ type: 'filterStatus', status: status });
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterStatus === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilterStatus('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterStatus === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilterStatus('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterStatus === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilterStatus('completed')}
      >
        Completed
      </a>
    </nav>
  );
};

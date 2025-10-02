import React, { FC } from 'react';
import { Filter } from '../../types/todo';
import classNames from 'classnames';

type Props = {
  activeFilter: Filter;
  handleActiveFilter: (filter: Filter) => void;
  handleClearCompleted: () => void;
  counter: number;
};

export const Footer: FC<Props> = ({
  counter,
  activeFilter,
  handleActiveFilter = () => {},
  handleClearCompleted = () => {},
}) => {
  console.log(activeFilter);
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter === 1 ? '1 item left' : `${counter} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleActiveFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === 'all',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

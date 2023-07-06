import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  onClearCompleted: () => void;
  activeTodosCount: number;
  completedTodosCount: number;
};

const filteredLinks = [
  {
    title: 'All',
    to: Status.ALL,
  },
  {
    title: 'Active',
    to: Status.ACTIVE,
  },
  {
    title: 'Completed',
    to: Status.COMPLETED,
  },
];

export const Footer: React.FC<Props> = ({
  onClearCompleted,
  activeTodosCount,
  completedTodosCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <ul className="filter" data-cy="todosFilter">
        {filteredLinks.map(({ title, to }) => (
          <li key={title}>
            <NavLink
              to={to}
              className={({ isActive }) => classNames(
                'filter__link',
                { selected: isActive },
              )}
              replace
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'is-invisible': !completedTodosCount },
        )}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

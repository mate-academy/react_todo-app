import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { LinksPath } from '../../types/LinksPath';

type Props = {
  onClearCompleted: () => void;
  activeTodosCount: number;
  completedTodosCount: number;
};

const filteredLinks = [
  {
    title: 'All',
    to: LinksPath.ALL,
  },
  {
    title: 'Active',
    to: LinksPath.ACTIVE,
  },
  {
    title: 'Completed',
    to: LinksPath.COMPLETED,
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

      {completedTodosCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

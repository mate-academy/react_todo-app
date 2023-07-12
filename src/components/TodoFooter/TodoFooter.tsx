import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { LinkPath } from '../../types/LinkPath';

const filterLinks = [
  { title: 'All', to: LinkPath.ALL },
  { title: 'Active', to: LinkPath.ACTIVE },
  { title: 'Completed', to: LinkPath.COMPLETED },
];

type Props = {
  itemsLeft: number,
  completedCount: number,
  onClearCompleted: () => void,
};

export const TodoFooter: React.FC<Props> = React.memo(({
  itemsLeft,
  onClearCompleted,
  completedCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        {filterLinks.map(({ title, to }) => (
          <NavLink
            key={title}
            className={({ isActive }) => classNames('filter__link', {
              selected: isActive,
            })}
            to={to}
            replace
          >
            {title}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!completedCount}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
});

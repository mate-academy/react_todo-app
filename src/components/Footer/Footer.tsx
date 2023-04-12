import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  remainingTodos: number,
  completedTodos: number,
  onDeleteCompleted: () => void
};

const filterLinks = [
  {
    title: 'All',
    link: '/',
  },
  {
    title: 'Active',
    link: '/active',
  },
  {
    title: 'Completed',
    link: '/completed',
  },
];

export const Footer: React.FC<Props> = ({
  remainingTodos,
  completedTodos,
  onDeleteCompleted,
}) => {
  const todosInCountTitle = remainingTodos === 1 ? 'item' : 'items';

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${remainingTodos} ${todosInCountTitle} left`}
      </span>

      <nav className="filter">
        {filterLinks.map(({ title, link }) => (
          <NavLink
            to={link}
            className={({ isActive }) => classNames(
              'filter__link',
              { selected: isActive },
            )}
            replace
          >
            {title}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{
          opacity: completedTodos ? 1 : 0,
          pointerEvents: completedTodos ? 'all' : 'none',
        }}
        onClick={onDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

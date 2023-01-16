import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Todo } from '../types/Todo';

type Props = {
  items: Todo[],
  handleClearCompleted: () => void,
};

const PageNavLink: React.FC<{ to: string, title: string }> = ({
  to, title,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames({ selected: isActive })}
  >
    {title}
  </NavLink>
);

export const TodoFilter: React.FC<Props> = ({
  items, handleClearCompleted,
}) => {
  const activeTodos = items.filter(item => !item.completed).length;
  const isCompleted = items.some(item => item.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <PageNavLink to="/" title="All" />
        </li>

        <li>
          <PageNavLink to="active" title="Active" />
        </li>

        <li>
          <PageNavLink to="completed" title="Completed" />
        </li>
      </ul>

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

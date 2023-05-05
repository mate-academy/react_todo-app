import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FiltersLink } from '../../types/FiltersLink';

type Props = {
  amountActiveTodos: number,
  amountCompletedTodos: number,
  onClearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  amountActiveTodos,
  amountCompletedTodos,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountActiveTodos} item${amountActiveTodos === 1 ? '' : 's'} left`}
      </span>

      <ul className="filters">
        {FiltersLink.map(({ to, title }) => (
          <li>
            <NavLink
              to={to}
              className={({ isActive }) => classNames(
                { selected: isActive },
              )}
              replace
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      {!!amountCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};

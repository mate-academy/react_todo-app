import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Status } from '../../types/Status';
import { capitalize } from '../../helpers/capitalize';

type Props = {
  allTodosCount: number;
  activeTodosCount: number;
  onClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  allTodosCount,
  activeTodosCount,
  onClearCompleted,
}) => {
  const filterLinks = Object.values(Status);
  const completedTodosCount = allTodosCount - activeTodosCount;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <ul className="filters">
        {filterLinks.map(filterLink => (
          <li key={filterLink}>
            <NavLink
              to={filterLink === Status.All ? '/' : `/${filterLink}`}
              className={(({ isActive }) => classNames({ selected: isActive }))}
            >
              {capitalize(filterLink)}
            </NavLink>
          </li>
        ))}
      </ul>

      {!!completedTodosCount && (
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

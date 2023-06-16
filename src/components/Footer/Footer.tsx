import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { filteredLinks } from '../../utils/filterLinks';

type Props = {
  isTodoCompleted: boolean,
  activeTodosCount: number,
  handleClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  isTodoCompleted,
  activeTodosCount,
  handleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <ul className="filter">
        {filteredLinks.map(link => (
          <li key={link.title}>
            <NavLink
              to={link.to}
              className={({ isActive }) => classNames(
                'filter__link',
                { selected: isActive },
              )}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: isTodoCompleted
            ? 'visible'
            : 'hidden',
        }}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

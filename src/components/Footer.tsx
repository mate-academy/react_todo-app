import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../types/FilterType';

type Props = {
  onDeleteCompletedTodos(): void,
  todosLeft: number,
  completedTodosLength: number,
};

export const Footer: React.FC<Props> = ({
  onDeleteCompletedTodos,
  todosLeft,
  completedTodosLength,
}) => {
  const linkNormalizing = (value: string) => {
    if (value === 'all') {
      return ('/');
    }

    return (`/${value}`);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <ul className="filters">
        {Object.entries(FilterType).map(([key, value]) => (
          <li key={key}>
            <NavLink
              to={linkNormalizing(value)}
              className={({ isActive }) => classNames({
                selected: isActive,
              })}
            >
              {key}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onDeleteCompletedTodos}
        className={classNames(
          'clear-completed',
          {
            'clear-completed--hidden':
            completedTodosLength === 0,
          },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};

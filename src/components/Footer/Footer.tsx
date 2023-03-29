import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Todo, Filter, FilterValue } from '../../types';
import { links } from '../../api/todos';
import { countActiveTodos, checkCompletedTodos } from '../../utils';

type Props = {
  todos: Todo[],
  filter: Filter,
  setFilter: (filterType: Filter) => void,
  removeCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  setFilter,
  filter,
  removeCompletedTodos,
}) => {
  const changeFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filterType = event.currentTarget.textContent as FilterValue;

    if (filterType) {
      setFilter(Filter[filterType]);
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countActiveTodos(todos)} items left`}
      </span>

      <nav className="filter">
        {links.map(link => (
          <Link
            key={link}
            to={link === 'All' ? '../' : `../${link.toLowerCase()}`}
            className={classNames(
              'filter__link',
              {
                selected: link === filter,
              },
            )}
            onClick={changeFilter}
          >
            {link}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'todoapp__clear-completed-disabled': !checkCompletedTodos(todos) },
        )}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>

    </footer>
  );
};

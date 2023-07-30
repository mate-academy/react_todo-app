import React, { useMemo } from 'react';
import { FilterQuery, useTodosContext } from '../utils/utils';

interface FooterProps {
  filterQuery: FilterQuery;
  filter: (query: FilterQuery) => void;
  handleClear: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  filterQuery,
  filter,
  handleClear,
}) => {
  const todos = useTodosContext();
  const uncompleted = useMemo(() => {
    return todos.filter((todo) => todo.completed === false);
  }, [todos]);
  const completed = useMemo(() => {
    return todos.filter((todo) => todo.completed === true);
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompleted.length === 1 ? '1 item left' : `${uncompleted.length} items left`}`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            onClick={() => filter(FilterQuery.All)}
            className={filterQuery === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => filter(FilterQuery.Active)}
            className={filterQuery === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => filter(FilterQuery.Completed)}
            className={filterQuery === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      {completed.length > 0
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => handleClear()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

import React from 'react';
import classNames from 'classnames';
import { useTodos, FILTERS } from '../context/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter, activeCount, hasCompleted, clearCompleted } =
    useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FILTERS).map(f => (
          <a
            key={f}
            href={`#/${f === FILTERS.all ? '' : f}`}
            className={classNames('filter__link', { selected: filter === f })}
            onClick={e => {
              e.preventDefault();
              setFilter(f);
            }}
            data-cy={`FilterLink${f.charAt(0).toUpperCase() + f.slice(1)}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={clearCompleted}
        disabled={!hasCompleted}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

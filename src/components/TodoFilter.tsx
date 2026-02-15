import React from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoFilter: React.FC = () => {
  const { filter, setFilter, activeCount, hasCompleted, clearCompleted } =
    useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {(['all', 'active', 'completed'] as const).map(type => (
          <a
            key={type}
            href={`#/${type === 'all' ? '' : type}`}
            className={`filter__link ${filter === type ? 'selected' : ''}`}
            onClick={e => {
              e.preventDefault();
              setFilter(type);
            }}
            data-cy={`FilterLink${type.charAt(0).toUpperCase() + type.slice(1)}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
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

import React from 'react';
import { useTodos } from '../context/TodosContext';
import type { Filter } from '../hooks/useHashFilter';
import cn from 'classnames';

export const Footer: React.FC<{
  filter: Filter;
  inputRef: React.RefObject<HTMLInputElement>;
}> = ({ filter, inputRef }) => {
  const { activeCount, clearCompleted, todos } = useTodos();
  const completedCount = todos.length - activeCount;

  if (todos.length === 0) {
    return null;
  }

  const onClearCompleted = () => {
    clearCompleted();
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
        >
          All
        </a>
        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>
        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

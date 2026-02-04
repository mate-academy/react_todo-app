import React from 'react';
import cl from 'classnames';

import { useTodos } from '../../hooks/useTodos';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClear: () => void;
};

export const TodoAppFooter: React.FC<Props> = ({
  filter,
  onFilterChange,
  onClear,
}) => {
  const { todos, clearCompleted } = useTodos();

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearCompleted = () => {
    clearCompleted();
    onClear();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={cl('filter__link', { selected: filter === 'all' })}
          onClick={() => onFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cl('filter__link', { selected: filter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cl('filter__link', { selected: filter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

interface Props {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFooter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, clearCompleted } = useContext(TodoContext);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            onFilterChange('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            onFilterChange('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            onFilterChange('completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={() => {
          clearCompleted();
          const input = document.querySelector<HTMLInputElement>(
            `[data-cy="NewTodoField"]`,
          );
          input?.focus();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

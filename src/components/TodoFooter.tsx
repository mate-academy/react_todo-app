import React from 'react';
import {
  useTodoActions,
  useTodoFilter,
  useTodos,
} from '../context/TodoContext';
import { FilterStatus } from '../types/Todo';

const FILTERS: { label: string; value: FilterStatus; dataCy: string }[] = [
  { label: 'All', value: 'all', dataCy: 'FilterLinkAll' },
  { label: 'Active', value: 'active', dataCy: 'FilterLinkActive' },
  { label: 'Completed', value: 'completed', dataCy: 'FilterLinkCompleted' },
];

const FILTER_HREF: Record<FilterStatus, string> = {
  all: '#/',
  active: '#/active',
  completed: '#/completed',
};

export const TodoFooter: React.FC = () => {
  const { activeTodosCount, hasCompletedTodos, newTodoInputRef } = useTodos();
  const { filter, setFilter } = useTodoFilter();
  const { clearCompleted } = useTodoActions();

  const handleClearCompleted = () => {
    clearCompleted();
    newTodoInputRef.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTERS.map(({ label, value, dataCy }) => (
          <a
            key={value}
            href={FILTER_HREF[value]}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => setFilter(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import React from 'react';

type Props = {
  todos: Todo[];
  onFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
  onClearCompleted: () => void;
};

const FILTERS = [
  { label: 'All', value: Filter.All, href: '#/' },
  { label: 'Active', value: Filter.Active, href: '#/active' },
  { label: 'Completed', value: Filter.Completed, href: '#/completed' },
];

export const TodoFooter: React.FC<Props> = ({
  todos,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTERS.map(({ label, value, href }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${currentFilter === value ? 'selected' : ''}`}
            onClick={() => onFilterChange(value)}
            data-cy={`FilterLink${label}`}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={() => {
          onClearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

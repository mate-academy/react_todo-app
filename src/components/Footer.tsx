import React from 'react';
import { useTodo } from '../context/TodoContext';
import { Filter } from '../types/filter';

interface FooterProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const filterConfig: {
  label: string;
  value: Filter;
  path: string;
  dataCy: string;
}[] = [
  { label: 'All', value: 'all', path: '#/', dataCy: 'FilterLinkAll' },
  {
    label: 'Active',
    value: 'active',
    path: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    label: 'Completed',
    value: 'completed',
    path: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Footer: React.FC<FooterProps> = ({ filter, setFilter }) => {
  const { todos, clearCompleted } = useTodo();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterConfig.map(({ label, value, path, dataCy }) => (
          <a
            key={value}
            href={path}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            onClick={() => setFilter(value)}
            data-cy={dataCy}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

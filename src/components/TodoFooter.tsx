import React from 'react';
import classNames from 'classnames';
import { FilterType, useTodos } from '../context/TodoContext';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const TodoFooter: React.FC = () => {
  const {
    todos,
    filter,
    activeTodosCount,
    clearCompleted,
    setFilter,
    hasCompleted,
  } = useTodos();

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTERS.map(({ label, value }) => (
          <a
            key={value}
            href={`#/${value}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={`FilterLink${label}`}
            onClick={event => {
              event.preventDefault();
              setFilter(value);
            }}
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
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;

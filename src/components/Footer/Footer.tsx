import React from 'react';
import {Todo} from '../../types/Todo';

interface FooterProps {
  todos: Todo[];
  status: 'all' | 'active' | 'completed';
  setStatus: (status: 'all' | 'active' | 'completed') => void;
  handleClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
                                                todos,
                                                status,
                                                setStatus,
                                                handleClearCompleted
                                              }) => {
  const filters: {
    key: 'all' | 'active' | 'completed';
    label: string;
    cy: string;
  }[] = [
    {key: 'all', label: 'All', cy: 'FilterLinkAll'},
    {key: 'active', label: 'Active', cy: 'FilterLinkActive'},
    {key: 'completed', label: 'Completed', cy: 'FilterLinkCompleted'}
  ];

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const buttonProps = {
    type: 'button' as const,
    className: 'todoapp__clear-completed',
    'data-cy': 'ClearCompletedButton',
    disabled: completedTodosCount === 0,
    onClick: handleClearCompleted
  };

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map((filter) => (
          <a
            key={filter.key}
            href="#/"
            className={`filter__link ${status === filter.key ? 'selected' : ''}`}
            data-cy={filter.cy}
            onClick={(event) => {
              event.preventDefault();
              setStatus(filter.key);
            }}
          >
            {filter.label}
          </a>
        ))}
      </nav>

      <button
        {...buttonProps}
      >
        Clear completed
      </button>
    </footer>
  );
};

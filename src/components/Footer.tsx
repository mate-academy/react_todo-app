import React from 'react';
import { useTodos } from '../TodoContext';
import { StatusFilter } from '../types';

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(StatusFilter).map(filterType => (
          <a
            key={filterType}
            href={`#/${filterType}`}
            className={`filter__link ${filter === filterType ? 'selected' : ''}`}
            data-cy={`FilterLink${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}
            onClick={e => {
              e.preventDefault();
              setFilter(filterType);
            }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

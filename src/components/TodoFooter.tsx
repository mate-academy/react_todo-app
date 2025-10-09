/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useTodos } from '../context/TodosContext';

export const TodoFooter: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted, newTodoRef } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(t => !t.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {(['All', 'Active', 'Completed'] as const).map(f => (
          <a
            key={f}
            href={`#/${f.toLowerCase()}`}
            className={`filter__link ${filter === f ? 'selected' : ''}`}
            onClick={() => setFilter(f)}
            data-cy={`FilterLink${f}`}
          >
            {f}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={() => {
          clearCompleted();
          newTodoRef.current?.focus();
        }}
        disabled={todos.every(t => !t.completed)}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

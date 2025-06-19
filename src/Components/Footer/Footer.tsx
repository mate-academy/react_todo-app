import React from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodoContext();

  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={countCompletedTodos === 0}
        onClick={() => {
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React from 'react';
import { useTodos } from '../../context/TodosContext';

export const ListFooter: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => todo.id !== 0 && !todo.completed).length} items
        left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link${filter === 'all' ? ' selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link${filter === 'active' ? ' selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link${filter === 'completed' ? ' selected' : ''}`}
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
        disabled={!todos.some(todo => todo.id !== 0 && todo.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

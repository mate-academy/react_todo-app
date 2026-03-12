import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  setFilter: (f: 'all' | 'active' | 'completed') => void;
  filter: 'all' | 'active' | 'completed';
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { todos, clearCompleted } = context;

  const allCompleted = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {allCompleted} items left
      </span>

      {/* Active link should have the 'selected' class */}
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

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={allCompleted === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};

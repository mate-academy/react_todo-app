import React from 'react';
import { Filter } from '../types/Filter';
import { todoContext } from './todoContext';

type FooterProps = { focusInput: () => void };
export const Footer: React.FC<FooterProps> = ({ focusInput }) => {
  const { todos, setTodos, filter, setFilter } = React.useContext(todoContext)!;
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: Filter,
  ) => {
    event.preventDefault();
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    setTimeout(() => {
      focusInput();
    }, 0);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link${filter === 'all' ? ' selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={e => handleFilterChange(e, 'all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link${filter === 'active' ? ' selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={e => handleFilterChange(e, 'active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link${filter === 'completed' ? ' selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={e => handleFilterChange(e, 'completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

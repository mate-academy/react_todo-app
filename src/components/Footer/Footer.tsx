import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';

enum FILTER {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const Footer: React.FC = () => {
  const { todos, setClear, setFilter } = useContext(TodoContext);

  const handleFilteredAll = () => {
    setFilter(FILTER.ALL);
  };

  const handleFilteredActive = () => {
    setFilter(FILTER.ACTIVE);
  };

  const handleFilteredCompleted = () => {
    setFilter(FILTER.COMPLETED);
  };

  const handleClearCompleted = () => {
    setClear();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => todo.completed === false).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={handleFilteredAll}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={handleFilteredActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={handleFilteredCompleted}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React, { useContext, useMemo } from 'react';
import { TodosStateContext } from '../providers/TodosProvider';

export const Footer = () => {
  const { state } = useContext(TodosStateContext);

  const activeTodos = useMemo(() => {
    return state?.todos.filter(todo => !todo.completed);
  }, [state?.todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos?.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a href="#/active" className="filter__link" data-cy="FilterLinkActive">
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

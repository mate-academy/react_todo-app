import React from 'react';

import { Filter } from '../enums/Filter';
import { useTodoContext } from '../hooks/useTodoContext';

export const Footer: React.FC = () => {
  const {
    state: { todos, filter },
    dispatch,
  } = useTodoContext();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: 'setFilter', payload: Filter.All })}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${
            filter === Filter.Active ? 'selected' : ''
          }`}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Filter.Active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${
            filter === Filter.Completed ? 'selected' : ''
          }`}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Filter.Completed })
          }
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
        onClick={() => dispatch({ type: 'clearCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};

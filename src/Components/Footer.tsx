import React, { useContext } from 'react';
import { Filter } from '../types/Todo';
import { callbacks } from '../localStorage/localStorage';
import { Context } from './ContextProvider';

interface FooterProps {
  filter: Filter;
  setFilter: (value: Filter) => void;
}

export const Footer: React.FC<FooterProps> = React.memo(
  ({ filter, setFilter }) => {
    const { todos, setTodos, inputRef } = useContext(Context);

    function handleDeleteAllCompletedTodos() {
      const notCompletedTodos = todos.filter(todo => !todo.completed);

      setTodos(notCompletedTodos);

      callbacks.setTodos(notCompletedTodos);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }

    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${todos.filter(todo => !todo.completed && todo.id !== -1).length} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
            data-cy="FilterLinkAll"
            onClick={() => setFilter(Filter.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
            data-cy="FilterLinkActive"
            onClick={() => setFilter(Filter.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter(Filter.Completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!todos.some(todo => todo.completed)}
          onClick={() => handleDeleteAllCompletedTodos()}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';

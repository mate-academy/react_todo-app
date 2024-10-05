import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { Options } from '../../type/Options';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, option, setOption } = useContext(TodosContext);
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: option === Options.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setOption(Options.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: option === Options.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setOption(Options.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: option === Options.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setOption(Options.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          const updatedTodos = todos.filter(todo => !todo.completed);

          setTodos(updatedTodos);
        }}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

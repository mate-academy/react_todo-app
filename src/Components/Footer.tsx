import classNames from 'classnames';
import { useTodos } from './services/ContextHook';

export const Footer = () => {
  const { todos, filter, setFilter, countTodos, clearCompleted, mainInputRef } =
    useTodos();

  const handleClear = () => {
    clearCompleted();
    mainInputRef.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={event => {
            event?.preventDefault();
            setFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={event => {
            event?.preventDefault();
            setFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => {
            event?.preventDefault();
            setFilter('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!todos.some(t => t.completed)}
        data-cy="ClearCompletedButton"
        onClick={handleClear}
      >
        Clear completed
      </button>
    </footer>
  );
};

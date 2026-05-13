/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import { QueryTodos } from '../../constants/queryTodos';
import { useTodos } from '../../providers/TodosProvider';

export const TodoFooter = () => {
  const {
    query,
    todos,
    uncompletedTodosLength,
    setQuery,
    setTodos,
    focusHeaderInput,
  } = useTodos();

  if (!todos.length) {
    return null;
  }

  const handleClearCompletedTodos = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* hide footer if no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodosLength} items left
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#"
          className={classNames('filter__link', {
            // eslint-disable-next-line prettier/prettier
            selected: query === QueryTodos.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setQuery(QueryTodos.All)}
        >
          All
        </a>

        <a
          href="#active"
          className={classNames('filter__link', {
            // eslint-disable-next-line prettier/prettier
            selected: query === QueryTodos.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setQuery(QueryTodos.Active)}
        >
          Active
        </a>

        <a
          href="#completed"
          className={classNames('filter__link', {
            // eslint-disable-next-line prettier/prettier
            selected: query === QueryTodos.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQuery(QueryTodos.Completed)}
        >
          Completed
        </a>
      </nav>
      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={uncompletedTodosLength === todos.length}
        onClick={() => {
          handleClearCompletedTodos();
          focusHeaderInput();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

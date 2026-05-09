import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { FilterTodos } from '../../types/FilterTodosEnum';
import classNames from 'classnames';

export const Footer = () => {
  const { todos, filter, setFilter, clearCompletedTodos } =
    useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterTodos.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterTodos.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterTodos.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodos}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

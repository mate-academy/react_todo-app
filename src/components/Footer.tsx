import { useContext } from 'react';
import { TodosContext } from '../context/TodoContext';
import { FilterStatus } from '../types/FilterStatus';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted, focusHeaderInput } =
    useContext(TodosContext);

  const handlerClearCompleted = () => {
    clearCompleted();
    focusHeaderInput();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames(
            `filter__link ${filter === FilterStatus.all ? `selected` : ''}`,
          )}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterStatus.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            `filter__link ${filter === FilterStatus.active ? `selected` : ''}`,
          )}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterStatus.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            `filter__link ${filter === FilterStatus.completed ? `selected` : ''}`,
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterStatus.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.filter(todo => todo.completed).length === 0}
        onClick={handlerClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

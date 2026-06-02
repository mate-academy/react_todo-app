import classNames from 'classnames';
import { FilterOption } from '../../types/FilterOption';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useTodoState } from '../../hooks/useTodoState';
import { useFocusInput } from '../../hooks/useFocusInput';

export const Footer = () => {
  const { filter, activeTodosCount, completedTodosCount } = useTodoState();
  const { setFilter, removeCompleted } = useTodoActions();
  const focusInput = useFocusInput();

  const hasCompletedTodos = completedTodosCount > 0;

  const handleRemoveCompleted = () => {
    removeCompleted();
    focusInput();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterOption.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterOption.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterOption.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterOption.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterOption.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterOption.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleRemoveCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

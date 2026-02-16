import classNames from 'classnames';
import { FILTERS } from '../constants/filter';
import { useTodoDispatch, useTodoState } from '../context/TodoContext';

export const TodoFooter = () => {
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleFilterChange = (
    checkedFilter: (typeof FILTERS)[keyof typeof FILTERS],
  ) => {
    dispatch({ type: 'SET_FILTER', payload: checkedFilter });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FILTERS.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleFilterChange(FILTERS.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FILTERS.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleFilterChange(FILTERS.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FILTERS.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleFilterChange(FILTERS.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

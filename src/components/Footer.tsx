import classNames from 'classnames';
import { useTodos } from '../context/TodosProvider';
import { FilterState } from '../types/FilterState';

export const Footer: React.FC = () => {
  const { todos, filter, newTodoFormRef, dispatch } = useTodos();
  const activeTodos = todos.filter(todo => !todo.completed);
  const isCompletedTodo = todos.some(todo => todo.completed);

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterState.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: 'SET_FILTER', payload: FilterState.All })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterState.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'SET_FILTER', payload: FilterState.Active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterState.Completed,
          })}
          onClick={() =>
            dispatch({ type: 'SET_FILTER', payload: FilterState.Completed })
          }
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={!isCompletedTodo}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => (
          dispatch({ type: 'DELETE_COMPLETED_TODOS' }),
          newTodoFormRef.current?.focus()
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};

import { useMemo } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { ActionType } from '../reduces/TodoReducer';

export const Footer = () => {
  const { state, dispatch } = useTodoContext();

  const completedTodos = useMemo(() => {
    return state.todos.filter(todo => todo.completed);
  }, [state]);

  const getNumberOfTodos = () => {
    return state.todos.length - completedTodos.length;
  };

  return (
    <>
      {/* Hide the footer if there are no todos */}
      {!!state.todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${getNumberOfTodos()} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${state.filterStatus === 'ALL' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() =>
                dispatch({ type: ActionType.FILTER_TODO, payload: 'ALL' })
              }
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${state.filterStatus === 'ACTIVE' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() =>
                dispatch({ type: ActionType.FILTER_TODO, payload: 'ACTIVE' })
              }
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${state.filterStatus === 'COMPLETED' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: ActionType.FILTER_TODO, payload: 'COMPLETED' })
              }
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: ActionType.CLEAR_COMPLETED })}
            disabled={completedTodos.length === 0}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

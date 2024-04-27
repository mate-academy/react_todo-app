import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/todoReducer';
import { Action } from '../../types/actions';
import { Filter } from '../../types/state';

export const Footer = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isActiveTodo = todos.some(todo => todo.completed);

  const status = todos.filter(todo => !todo.completed);

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${status.length} ${status.length === 1 ? 'item' : 'items'} left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filter === Filter.all && 'selected'}`}
              data-cy="FilterLinkAll"
              onClick={() =>
                dispatch({
                  type: Action.changeFiilter,
                  payload: Filter.all,
                })
              }
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filter === Filter.active && 'selected'}`}
              data-cy="FilterLinkActive"
              onClick={() =>
                dispatch({ type: Action.changeFiilter, payload: Filter.active })
              }
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filter === Filter.completed && 'selected'}`}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({
                  type: Action.changeFiilter,
                  payload: Filter.completed,
                })
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
            {...(!isActiveTodo && {
              style: { opacity: 0 },
            })}
            {...(!isActiveTodo && { disabled: true })}
            onClick={() => dispatch({ type: Action.cleareCompleted })}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/Store';

import cn from 'classnames';

export const TodoFooter: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      {state.todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${state.todos.filter(todo => !todo.completed).length} items left`}
          </span>
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: state.filter === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => dispatch({ type: 'setFilter', payload: 'all' })}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: state.filter === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => dispatch({ type: 'setFilter', payload: 'active' })}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: state.filter === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setFilter', payload: 'completed' })
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
            onClick={() => dispatch({ type: 'clearCompleted' })}
            disabled={state.todos.every(todo => !todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

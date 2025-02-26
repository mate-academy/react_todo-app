import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../TodoContext';
import { FilterStatus } from '../../types/FilterStatus';
import cn from 'classnames';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filterStatus } = useContext(StateContext);
  const todosLeft = todos.filter(t => !t.completed);
  const isDisableComplete = todos.some(todo => todo.completed);

  const removeCompletedTodo = () => {
    dispatch({ type: 'removeCompletedTodo' });
  };

  const setFilterStatus = (status: FilterStatus) => {
    dispatch({ type: 'changeFilterStatus', status: status });
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todosLeft.length} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterStatus === FilterStatus.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterStatus(FilterStatus.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filterStatus === FilterStatus.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterStatus(FilterStatus.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filterStatus === FilterStatus.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterStatus(FilterStatus.Completed)}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={removeCompletedTodo}
            disabled={!isDisableComplete}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

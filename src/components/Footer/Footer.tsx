import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../Todo/TodoContext';
import { FilterBy } from '../../types/FilterBy';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filterStatus } = useContext(StateContext);
  const todoLeft = todos.filter(todo => !todo.completed);
  const isDisableComplete = todos.some(todo => todo.completed);
  const removedCompletedTodo = () => {
    dispatch({ type: 'removeCompletedTodo' });
  };

  const changeFilterStatus = (status: FilterBy) => {
    dispatch({ type: 'changeFilterStatus', status: status });
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todoLeft.length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterStatus === FilterBy.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => changeFilterStatus(FilterBy.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterStatus === FilterBy.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => changeFilterStatus(FilterBy.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterStatus === FilterBy.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => changeFilterStatus(FilterBy.Completed)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={removedCompletedTodo}
            disabled={!isDisableComplete}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

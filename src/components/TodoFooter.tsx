import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

export const TodoFooter: React.FC = () => {
  const { todos, filterType } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (todos.length === 0) {
    return <></>;
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const notComletedTodos = todos.filter(todo => !todo.completed);

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${notComletedTodos.length} items left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filterType === Filter.All,
            })}
            data-cy="FilterLinkAll"
            onClick={() =>
              dispatch({ type: 'setFilterType', newFilterType: Filter.All })
            }
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filterType === Filter.Active,
            })}
            data-cy="FilterLinkActive"
            onClick={() =>
              dispatch({ type: 'setFilterType', newFilterType: Filter.Active })
            }
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filterType === Filter.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() =>
              dispatch({
                type: 'setFilterType',
                newFilterType: Filter.Completed,
              })
            }
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className={'todoapp__clear-completed'}
          data-cy="ClearCompletedButton"
          onClick={() =>
            dispatch({ type: 'setTodos', newTodos: notComletedTodos })
          }
          disabled={completedTodos.length === 0}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};

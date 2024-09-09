import { useContext } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from './Store';
import { getActiveTodosArray, getCompletedTodosArray } from '../services';
import { FilterTodos } from '../types/FilterTodos';

export const Footer = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getActiveTodosArray(todos).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: 'setFilterByStatus', payload: FilterTodos.All })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'setFilterByStatus', payload: FilterTodos.Active })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({
              type: 'setFilterByStatus',
              payload: FilterTodos.Completed,
            })
          }
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={getCompletedTodosArray(todos).length === 0}
        onClick={() => {
          dispatch({ type: 'clearAllCompleted' });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

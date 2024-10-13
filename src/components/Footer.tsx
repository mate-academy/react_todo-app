import React from 'react';
import { useGlobalDispatch, useGlobalState } from '../store/Store';
import classNames from 'classnames';
import { ActionType } from '../enums/ActionTypes';
import { TodoFilter } from '../enums/TodoFilter';

type Props = {
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodoCount} ${activeTodoCount === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === TodoFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(TodoFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === TodoFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(TodoFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === TodoFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(TodoFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: ActionType.CLEAR_COMPLETED })}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

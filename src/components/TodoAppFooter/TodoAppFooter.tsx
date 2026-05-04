import React, { useCallback, useContext } from 'react';
import {
  ClickedClearCompletedContext,
  TodosContext,
  TodosFilterContext,
} from '../../TodosContext/Context';
import classNames from 'classnames';

export const TodoAppFooter: React.FC = () => {
  const filter = useContext(TodosFilterContext).filter;
  const setFilter = useContext(TodosFilterContext).setFilter;
  const todos = useContext(TodosContext).todos;
  const counter = todos.filter(todo => !todo.completed).length;
  const setClickClearButton = useContext(
    ClickedClearCompletedContext,
  ).setClickedClearCompleted;
  const isCompletedTodo = todos.some(todo => todo.completed);

  const clickFilterAll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setFilter('all');
    },
    [filter, todos],
  );

  const clickFilterActive = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setFilter('active');
    },
    [filter, todos],
  );

  const clickFilterCompleted = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setFilter('completed');
    },
    [filter, todos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={clickFilterAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={clickFilterActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={clickFilterCompleted}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => setClickClearButton(true)}
        disabled={!isCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React, { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../context/TodosContext';
import { TodosType } from '../../types/TodosInterface';
import { FilterEnum } from '../../types/FilterEnum';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = useMemo(() => {
    return [...todos].filter((currentTodo: TodosType) => {
      return currentTodo.completed === false;
    });
  }, [todos]);

  const completedTodos = useMemo(() => {
    return [...todos].some((currentTodo: TodosType) => {
      return currentTodo.completed === true;
    });
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() =>
            dispatch({ type: 'filter', filterType: FilterEnum.ALL })
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'filter', filterType: FilterEnum.ACTIVE })
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'filter', filterType: FilterEnum.COMPLETED })
          }
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={!completedTodos}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'deleteCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};

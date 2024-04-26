import React from 'react';
import { useContext } from 'react';
import cn from 'classnames';
import { TodoContext } from './TodoContext';
import { FilterAction, ListAct } from '../types/Actions';

export const Filter: React.FC = () => {
  const { todos, dispatch, handleFilter, filterOption, allTodos } =
    useContext(TodoContext);
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    type: FilterAction,
  ) => {
    event.preventDefault();
    handleFilter(type);
  };

  const hasCompleteTodo = todos.some(todo => todo.completed === true);

  const showTodos = allTodos.filter(todo => !todo.completed).length;

  return (
    <>
      {allTodos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {showTodos} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterOption === FilterAction.All,
              })}
              data-cy="FilterLinkAll"
              onClick={event => {
                handleFilterChange(event, FilterAction.All);
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filterOption === FilterAction.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={event => {
                handleFilterChange(event, FilterAction.Active);
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filterOption === FilterAction.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={event => {
                handleFilterChange(event, FilterAction.Completed);
              }}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!hasCompleteTodo}
            onClick={() => {
              dispatch({ type: ListAct.ClearComplet });
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

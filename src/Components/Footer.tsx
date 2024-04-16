import React, { useContext } from 'react';
import cn from 'classnames';
import { ActionNames, FilterBy, TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const { todos, dispatch, handleFilterBy, filteredBy, originalTodos } =
    useContext(TodoContext);

  const activeTodos = originalTodos.filter(
    todo => todo.completed === false,
  ).length;
  const disabled = todos.some(todo => todo.completed);

  const handleFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    type: FilterBy,
  ) => {
    event.preventDefault();

    handleFilterBy(type);
  };

  return (
    <>
      {originalTodos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${activeTodos} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filteredBy === FilterBy.All,
              })}
              data-cy="FilterLinkAll"
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                handleFilter(event, FilterBy.All)
              }
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: filteredBy === FilterBy.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                handleFilter(event, FilterBy.Active)
              }
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filteredBy === FilterBy.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                handleFilter(event, FilterBy.Completed)
              }
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!disabled}
            onClick={() =>
              dispatch({
                type: ActionNames.ClearCompleted,
              })
            }
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

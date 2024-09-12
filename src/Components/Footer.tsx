import React, { useContext } from 'react';
import cn from 'classnames';
import { ActionNames, FilterBy, TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const { todos, dispatch, handleFilterBy, filteredBy, originalTodos } =
    useContext(TodoContext);

  const activeTodosCount = originalTodos.filter(
    todo => todo.completed === false,
  ).length;
  const isDisabled = todos.some(todo => todo.completed);

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
            {`${activeTodosCount} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.values(FilterBy).map(filter => (
              <a
                key={filter}
                href={`#/${filter === FilterBy.All ? '' : filter.toLowerCase()}`}
                className={cn('filter__link', {
                  selected: filteredBy === filter,
                })}
                data-cy={`FilterLink${filter}`}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                  handleFilter(event, filter)
                }
              >
                {filter}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!isDisabled}
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

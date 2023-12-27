import React, { useContext } from 'react';
import cn from 'classnames';
import { StateContext } from '../context/StateContext';
import { Status } from '../types/Filter';
import { ActionTypes } from '../types/Action';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    filterBy,
    setFilterBy,
    dispatch,
  } = useContext(StateContext);

  const uncompletedTodosCount = todos.filter((todo) => !todo.completed).length;

  const handleDeleteCompleted = () => {
    dispatch({ type: ActionTypes.REMOVE_ALL_COMPLETED });
  };

  const handleFilterBy = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setFilterBy(event.currentTarget.innerText as Status);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {uncompletedTodosCount === 1
          ? `${uncompletedTodosCount} item left`
          : `${uncompletedTodosCount} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterBy === Status.ALL })}
            onClick={handleFilterBy}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filterBy === Status.ACTIVE })}
            onClick={handleFilterBy}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterBy === Status.COMPLETED })}
            onClick={handleFilterBy}
          >
            Completed
          </a>
        </li>
      </ul>

      {uncompletedTodosCount !== todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

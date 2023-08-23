import React, { useContext } from 'react';
import cn from 'classnames';
import { StateContext } from '../context/StateContext';
import { Status } from '../types/Filter';

export const TodosFilter: React.FC = () => {
  const {
    value: todos,
    filterBy,
    setFilterBy,
    dispatch,
  } = useContext(StateContext);

  const uncompletedTodosCount = todos.filter((todo) => !todo.completed).length;

  const handleDeleteCompleted = () => {
    dispatch({ type: 'remove_all_completed' });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosCount} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: filterBy === Status.ALL })}
            onClick={() => setFilterBy(Status.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: filterBy === Status.ACTIVE })}
            onClick={() => setFilterBy(Status.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: filterBy === Status.COMPLETED })}
            onClick={() => setFilterBy(Status.COMPLETED)}
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

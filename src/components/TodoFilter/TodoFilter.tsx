import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOnClick = (status: Status) => {
    dispatch({ type: 'filter', payload: status });
  };

  const uncomplete = useMemo(
    () => todos.filter(todo => todo.completed === false).length,
    [todos],
  );

  const comletedLength = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {uncomplete} items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: filter === Status.All,
            })}
            onClick={() => handleOnClick(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: filter === Status.Active,
            })}
            onClick={() => handleOnClick(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: filter === Status.Completed,
            })}
            onClick={() => handleOnClick(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {comletedLength > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

import React, { useContext } from 'react';
import classNames from 'classnames';
import { DispatchContext, TodosContext } from '../TodosContext';
import { FilterContext } from '../FilterContext';
import { Status } from '../types/Status';

export const Footer: React.FC = () => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const { filter, setFilter } = useContext(FilterContext);

  const completedTodos = todos.filter(todo => todo.completed === true).length;
  const uncompletedTodos = todos
    .filter(todo => todo.completed === false).length;

  const deleteAllComplited = () => {
    dispatch({
      type: 'deleteAllCompleted',
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === Status.ALL,
            })}
            onClick={() => setFilter(Status.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === Status.ACTIVE,
            })}
            onClick={() => setFilter(Status.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === Status.COMPLETED,
            })}
            onClick={() => setFilter(Status.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteAllComplited}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

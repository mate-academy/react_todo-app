import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types';

export const TodosFilter: React.FC = () => {
  const {
    incompletedCount,
    areSomeCompleted,
    removeCompleted,
    status,
    setStatus,
  } = useContext(TodosContext);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${incompletedCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: status === Status.All,
            })}
            onClick={() => setStatus(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: status === Status.Active,
            })}
            onClick={() => setStatus(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: status === Status.Completed,
            })}
            onClick={() => setStatus(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {areSomeCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

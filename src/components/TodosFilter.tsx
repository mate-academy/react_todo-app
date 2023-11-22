import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../store';
import { Status } from '../types/Status';

export const TodosFilter: React.FC = () => {
  const { todos, status, dispatch } = useContext(TodosContext);
  const [showButton, setShowButton] = useState(false);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);

  if (hasCompleted !== showButton) {
    setShowButton(hasCompleted);
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos.length} items left`}
      </span>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: Status.All === status,
            })}
            onClick={() => dispatch({ type: 'STATUS', payload: Status.All })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: Status.Active === status,
            })}
            onClick={() => dispatch({ type: 'STATUS', payload: Status.Active })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: Status.Completed === status,
            })}
            onClick={
              () => dispatch({ type: 'STATUS', payload: Status.Completed })
            }
          >
            Completed
          </a>
        </li>
      </ul>

      {showButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

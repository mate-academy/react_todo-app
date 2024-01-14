import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../../types';
import { useTodoContext } from '../../store/TodoContext';

type Props = {
  selectStatus: (status: TodoStatus) => void;
  status: TodoStatus;
};

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  status,
}) => {
  const {
    completedTodos,
    clearAllCompleted,
    uncompletedTodosLength,
  } = useTodoContext();

  const singularityCheck = uncompletedTodosLength !== 1
    ? 's'
    : '';

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosLength} item${singularityCheck} left`}
      </span>

      <ul className="filters">
        {Object.entries(TodoStatus).map(([key, value]) => (
          <li>
            <a
              key={key}
              href={`#/${value}`}
              className={classNames({
                selected: value === status,
              })}
              onClick={() => selectStatus(value as TodoStatus)}
            >
              {key}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ visibility: completedTodos.length ? 'visible' : 'hidden' }}
        onClick={clearAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

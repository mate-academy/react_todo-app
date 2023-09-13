import React from 'react';
import classNames from 'classnames';
import { Status } from '../../enums/enums';
import { Todo } from '../../types/Todo';

type Props = {
  status: Status,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  todos: Todo[],
  onDeleteCompleted: () => Promise<void>,
};

export const Footer: React.FC<Props> = React.memo(
  ({
    status,
    setStatus,
    todos,
    onDeleteCompleted,
  }) => {
    const todosLeft = todos.filter(todo => !todo.completed).length;
    const isComplitedTodos = todos.some(todo => todo.completed);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todosLeft} items left`}
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: status === Status.All,
            })}
            onClick={() => setStatus(Status.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: status === Status.Active,
            })}
            onClick={() => setStatus(Status.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: status === Status.Completed,
            })}
            onClick={() => setStatus(Status.Completed)}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className={classNames('todoapp__clear-completed', {
            todo__status: !isComplitedTodos,
          })}
          onClick={onDeleteCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

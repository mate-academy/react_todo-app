import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Status, Todo } from '../../types/todo';

type Props = {
  status: Status;
  setStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({ status, setStatus }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const countItems = todos.filter(todo => !todo.completed).length;
  const item = countItems > 1 ? 'items' : 'item';

  const changeStatusHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    type: Status,
  ) => {
    e.preventDefault();

    switch (type) {
      case Status.All:
        setStatus(Status.All);
        break;

      case Status.Active:
        setStatus(Status.Active);
        break;

      case Status.Completed:
        setStatus(Status.Completed);
        break;

      default:
        break;
    }
  };

  const clearCompletedHandler = () => {
    const newTodos: Todo[] = todos.filter(t => !t.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countItems} ${item} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: status === Status.All,
            })}
            onClick={(e) => changeStatusHandler(e, Status.All)}
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
            onClick={(e) => changeStatusHandler(e, Status.Active)}
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
            onClick={(e) => changeStatusHandler(e, Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedHandler}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

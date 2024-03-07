import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../services/TodosContext';
import { Status } from '../types/Status';

type Props = {
  status: Status;
  selectStatus: (newStatus: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ status, selectStatus }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const completedTodosCount = useMemo(() => {
    let count = 0;

    todos.forEach(todoItem => {
      if (todoItem.completed) {
        count += 1;
      }
    });

    return count;
  }, [todos]);

  const notCompletedTodosCount = useMemo(
    () => todos.length - completedTodosCount,
    [completedTodosCount, todos],
  );

  const handleClearCompleted = useCallback((): void => {
    setTodos(todos.filter(todoItem => !todoItem.completed));
  }, [todos, setTodos]);

  return (
    <footer data-cy="todosFilter" className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {notCompletedTodosCount === 1
          ? '1 item left'
          : `${notCompletedTodosCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: status === Status.all })}
            onClick={() => selectStatus(Status.all)}
          >
            {Status.all}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: status === Status.active })}
            onClick={() => selectStatus(Status.active)}
          >
            {Status.active}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: status === Status.completed })}
            onClick={() => selectStatus(Status.completed)}
          >
            {Status.completed}
          </a>
        </li>
      </ul>

      {!!completedTodosCount && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

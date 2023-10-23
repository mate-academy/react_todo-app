import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../services/EnumStatusFilter';
import { TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
  const {
    deleteAllCompleted,
    count,
    selTodoFilterList,
    setSelTodoFilterList,
    todos,
  } = useContext(TodoContext);
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  const countNotCompletedTodos = (count === 1) ? `${count} item left` : `${count} items left`;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {countNotCompletedTodos}
      </span>

      <ul
        className="filters"
        data-cy="todosFilter"
      >
        <li>
          <a
            data-value={Status.ALL}
            href="#/"
            className={cn({ selected: selTodoFilterList === Status.ALL })}
            onClick={() => setSelTodoFilterList(Status.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            data-value={Status.ACTIVE}
            href="#/active"
            className={cn({ selected: selTodoFilterList === Status.ACTIVE })}
            onClick={() => setSelTodoFilterList(Status.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            data-value={Status.COMPLETED}
            href="#/completed"
            className={cn({ selected: selTodoFilterList === Status.COMPLETED })}
            onClick={() => setSelTodoFilterList(Status.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        hasCompletedTodos && (
          <button
            type="button"
            className="clear-completed"
            onClick={deleteAllCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};

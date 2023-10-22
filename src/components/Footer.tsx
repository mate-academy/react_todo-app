import React, { useContext } from 'react';
import { Status } from '../services/EnumStatusFilter';
import { TodoContext } from './TodoContext';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    deleteAllCompleted,
    count,
    selectTodoFilteredList,
    setSelectTodoFilteredList,
    todos,
  } = useContext(TodoContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${count} items left`}
      </span>

      <ul
        className="filters"
        data-cy="todosFilter"
      >
        <li>
          <a
            data-value={Status.ALL}
            href="#/"
            className={selectTodoFilteredList === Status.ALL
              ? 'selected'
              : ''}
            onClick={() => {
              setSelectTodoFilteredList(Status.ALL);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            data-value={Status.ACTIVE}
            href="#/active"
            className={selectTodoFilteredList === Status.ACTIVE
              ? 'selected'
              : ''}
            onClick={() => {
              setSelectTodoFilteredList(Status.ACTIVE);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            data-value={Status.COMPLETED}
            href="#/completed"
            className={selectTodoFilteredList === Status.COMPLETED
              ? 'selected'
              : ''}
            onClick={() => {
              setSelectTodoFilteredList(Status.COMPLETED);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        todos.some((todo) => todo.completed) && (
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

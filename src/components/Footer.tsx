import React, { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../services/EnumStatusFilter';
import { TodoContext } from './TodoContext';

export const Footer: React.FC = () => {
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
            className={
              cn({
                selected: selectTodoFilteredList === Status.ALL,
              })
            }
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
            className={
              cn({
                selected: selectTodoFilteredList === Status.ACTIVE,
              })
            }
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
            className={
              cn({
                selected: selectTodoFilteredList === Status.COMPLETED,
              })
            }
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

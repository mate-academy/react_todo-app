import React, { useState } from 'react';
import { deleteTodo } from '../../api/todos';
import classNames from 'classnames';

export function TodoFooter({ todos, deleteAllTodos, currentFilter, upDateUserTodos, getCurrentFilter }) {
  // const [clearCompleted, setClearCompleted] = useState(false);

  function deleteAllTodos() {
    const allCompleted = todos.filter(todo => todo.completed);
    const deleteTodos = allCompleted.map(todo => deleteTodo(todo.id));

    Promise.all(deleteTodos)
      .then(() => upDateUserTodos());
  }
  return (
    <>
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: currentFilter === 'all'})}
            onClick={() => getCurrentFilter("all")}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: currentFilter === 'active'})}
            onClick={() => getCurrentFilter("active")}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: currentFilter === 'completed'})}
            onClick={() => getCurrentFilter("completed")}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        // clearCompleted  &&
        <button
          type="button"
          className="clear-completed"
          onClick={deleteAllTodos}
        >
          Clear completed
        </button>
      }
    </>
  )
}

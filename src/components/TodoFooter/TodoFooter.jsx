import React, { useState } from 'react';
import classNames from 'classnames';

import { deleteTodo } from '../../api/todos';

export function TodoFooter({
    todos,
    deleteAllTodos,
    currentFilter,
    promiseAll,
    getCurrentFilter
  }) {
  const allCompleted = todos.filter(todo => todo.completed);;

  function deleteAllTodos() {
    const deleteTodos = allCompleted.map(todo => deleteTodo(todo.id));

    promiseAll(deleteTodos);
  }
  return (
    <>
      <span className="todo-count">
        {`${allCompleted.length} items left`}
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
        allCompleted.length > 0  &&
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

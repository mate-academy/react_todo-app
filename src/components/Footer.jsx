import React from 'react';
import classNames from 'classnames';

export const Footer = (
  { completedTodos,
    activeTodos,
    setFilter,
    filter,
    deleteCompletedTodos },
) => (
  <footer className="footer">
    <span className="todo-count">
      {activeTodos.length <= 1 ? (
        `${activeTodos.length} item left`
      ) : (
        `${activeTodos.length} items left`
      )}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === 'All',
          })}
          onClick={(event) => {
            setFilter(event.target.textContent);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === 'Active',
          })}
          onClick={(event) => {
            setFilter(event.target.textContent);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === 'Completed',
          })}
          onClick={(event) => {
            setFilter(event.target.textContent);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
    {!!completedTodos.length && (
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </footer>
);

import React from 'react';

export const Footer = (
  { completedTodos,
    activeTodos,
    setFilter,
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
          className="selected"
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

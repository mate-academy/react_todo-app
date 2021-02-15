import React from 'react';

export const Footer = ({
  todos,
  filters,
  setTodos,
  active,
  statusToShow,
  setStatusToShow,
}) => {

  return (
    <footer className="footer">

      <span className="todo-count">
        {active.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={statusToShow === filters.All ? 'selected' : ''}
            onClick={() => setStatusToShow(filters.All)}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow(filters.All);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={statusToShow === filters.Active ? 'selected' : ''}
            onClick={() => setStatusToShow(filters.Active)}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow(filters.Active);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={statusToShow === filters.Completed ? 'selected' : ''}
            onClick={() => setStatusToShow(filters.Completed)}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow(filters.Completed);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      {(active.length !== todos.length) && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(active)}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
}

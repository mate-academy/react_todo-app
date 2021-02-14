import React from 'react';

export const Footer = ({
  listOfToDos,
  setListOfToDos,
  notCompletedToDos,
  statusToShow,
  filterTodosByStatus,
}) => {

  return (
    <footer className="footer">

      <span className="todo-count">
        {notCompletedToDos.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={statusToShow === 'all' ? 'selected' : ''}
            onClick={() => filterTodosByStatus()}
            onKeyDown={(event) => {
              event.preventDefault();
              filterTodosByStatus(true);
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={
              (statusToShow === 'active'
                && notCompletedToDos.length > 0
              )
                ? 'selected'
                : ''
            }
            onClick={() => filterTodosByStatus(false)}
            onKeyDown={(event) => {
              event.preventDefault();
              filterTodosByStatus(true);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              (statusToShow === 'completed'
                && notCompletedToDos.length !== listOfToDos.length
              )
                ? 'selected'
                : ''
            }
            onClick={() => filterTodosByStatus(true)}
            onKeyDown={(event) => {
              event.preventDefault();
              filterTodosByStatus(true);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      {(notCompletedToDos.length !== listOfToDos.length) && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setListOfToDos(notCompletedToDos)}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
}

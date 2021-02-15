import React from 'react';

export const Footer = ({
  listOfToDos,
  setListOfToDos,
  notCompletedToDos,
  statusToShow,
  setStatusToShow,
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
            onClick={() => setStatusToShow('all')}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow('all');
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
              )
                ? 'selected'
                : ''
            }
            onClick={() => setStatusToShow('active')}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow('active');
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
              )
                ? 'selected'
                : ''
            }
            onClick={() => setStatusToShow('completed')}
            onKeyDown={(event) => {
              event.preventDefault();
              setStatusToShow('completed');
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

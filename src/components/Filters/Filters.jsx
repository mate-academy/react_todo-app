import React, { useEffect } from 'react';

export const Filters = ({ todos, setTypeFilter }) => {

  useEffect(() => {
    function test () {
      todos.map()
    }
  }, [todos]);

  return (
    <>
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>
      {console.log(todos)}
      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={event => setTypeFilter(event.target.innerText)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={event => setTypeFilter(event.target.innerText)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={event => setTypeFilter(event.target.innerText)}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={event => setTypeFilter(event.target.innerText)}
      >
        Clear completed
      </button>
    </>
  );
};

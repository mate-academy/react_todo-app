import React from 'react';

const TodoFilter = ({ toggleShowActive, toggleShowAll, toggleShowCompleted, activeFilter }) => (
  (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={activeFilter === false ? 'selected' : ''}
          onClick={toggleShowAll}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeFilter === 'Active' ? 'selected' : ''}
          onClick={toggleShowActive}
        >
            Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeFilter === 'Completed' ? 'selected' : ''}
          onClick={toggleShowCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
  )
);

export default TodoFilter;

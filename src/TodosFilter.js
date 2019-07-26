import React from 'react';

const TodosFilter = () => {

  return (
    <ul className="filters">
      <li>
        <a href="#/" className="selected">All</a>
      </li>

      <li>
        <a href="#/active">Active</a>
      </li>

      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
  );
};

export default TodosFilter;

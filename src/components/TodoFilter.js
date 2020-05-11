import React from 'react';

const TodoFilter = () => (
  <ul className="filters">
    <li>
      <a href="#/" className="selected">All</a>
    </li>

    <li>
      <a href="#/" className="">Active</a>
    </li>

    <li>
      <a href="#/" className="">Completed</a>
    </li>
  </ul>
);

export default TodoFilter;

import React from 'react';

export const TodosFilter = () => {
  const handleClick = evt => {
    console.log('click');
  };

  return (
    <ul className="filters">
      <li>
        <a href="#/" className="selected">
          All
        </a>
      </li>

      <li onClick={handleClick}>
        <a href="#/active">Active</a>
      </li>

      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
  );
};

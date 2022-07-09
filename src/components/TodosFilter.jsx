import React, { useState } from 'react';
import classNames from 'classnames';

export const TodosFilter = ({ todos, setFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const clickHandler = (value) => {
    const filterValue = value.currentTarget.textContent;

    setSelectedFilter(filterValue);
    setFilter(filterValue);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: selectedFilter === 'All',
          })}
          onClick={e => clickHandler(e)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={e => clickHandler(e)}
          className={classNames({
            selected: selectedFilter === 'Active',
          })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={e => clickHandler(e)}
          className={classNames({
            selected: selectedFilter === 'Completed',
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

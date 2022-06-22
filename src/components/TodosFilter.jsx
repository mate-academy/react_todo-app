/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import classNames from 'classnames';

export const TodosFilter = ({ todos, setFilter }) => {
  const [classValue, setClassValue] = useState('');

  const clickHandler = (value) => {
    const filterValue = value.currentTarget.textContent;

    setClassValue(filterValue);
    setFilter(filterValue);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames('', {
            selected: classValue === 'All',
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
          className={classNames('', {
            selected: classValue === 'Active',
          })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={e => clickHandler(e)}
          className={classNames('', {
            selected: classValue === 'Completed',
          })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

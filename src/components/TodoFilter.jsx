import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Filter } from '../constants/Filter';

export const TodoFilter = () => {
  const [filter, setFilter] = useState(Filter.all);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === Filter.all ? 'selected' : ''}
          onClick={() => setFilter(Filter.all)}
        >
          {Filter.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === Filter.active ? 'selected' : ''}
          onClick={() => setFilter(Filter.active)}
        >
          {Filter.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === Filter.completed ? 'selected' : ''}
          onClick={() => setFilter(Filter.completed)}
        >
          {Filter.completed}
        </a>
      </li>
    </ul>

  );
};

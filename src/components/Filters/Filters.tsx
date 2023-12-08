import React from 'react';

import './Filters.scss';

const Filters: React.FC = () => {
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

export default Filters;

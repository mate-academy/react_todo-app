import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({ setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className="selected"
        onClick={() => setFilter('ALL')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className="active"
        onClick={() => setFilter('ACTIVE')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className="completed"
        onClick={() => setFilter('COMPLETED')}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

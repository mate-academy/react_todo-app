import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Filters = ({ typeOfFilter, handleChangeFilter }) => (

  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({ selected: typeOfFilter === 'All' })}
        onClick={() => handleChangeFilter('All')}
      >
        All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        className={classNames({ selected: typeOfFilter === 'Active' })}
        onClick={() => handleChangeFilter('Active')}
      >
        Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        className={classNames({ selected: typeOfFilter === 'Completed' })}
        onClick={() => handleChangeFilter('Completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

Filters.propTypes = {
  typeOfFilter: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
};

export default Filters;

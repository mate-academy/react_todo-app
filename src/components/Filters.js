import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Filters = ({ handleTypeOfFilter, typeOfFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={cn({
          selected: typeOfFilter === 'all',
        })}
        onClick={() => handleTypeOfFilter('all')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={cn({
          selected: typeOfFilter === 'active',
        })}
        onClick={() => handleTypeOfFilter('active')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={cn({
          selected: typeOfFilter === 'completed',
        })}
        onClick={() => handleTypeOfFilter('completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

Filters.propTypes = {
  handleTypeOfFilter: PropTypes.func.isRequired,
  typeOfFilter: PropTypes.string.isRequired,
};

export default Filters;

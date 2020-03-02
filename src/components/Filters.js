import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Filters = ({ filter, changeFilter }) => (

  <ul className="filters">
    <li>
      <button
        type="button"
        data-filter="all"
        className={cn({ selected: filter === 'all' })}
        onClick={changeFilter}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        data-filter="active"
        className={cn({ selected: filter === 'active' })}
        onClick={changeFilter}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        data-filter="completed"
        className={cn({ selected: filter === 'completed' })}
        onClick={changeFilter}
      >
        Completed
      </button>
    </li>
  </ul>
);

Filters.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

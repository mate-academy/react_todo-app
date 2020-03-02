import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Filter = ({ handleFilterClick, filter }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={cx({ selected: filter === 'all' })}
        name="all"
        onClick={handleFilterClick}
      >
        All
      </button>
    </li>
    <li>
      <button
        type="button"
        className={cx({ selected: filter === 'active' })}
        name="active"
        onClick={handleFilterClick}
      >
        Active
      </button>
    </li>
    <li>
      <button
        type="button"
        className={cx({ selected: filter === 'completed' })}
        name="completed"
        onClick={handleFilterClick}
      >
        Completed
      </button>
    </li>
  </ul>
);

Filter.propTypes = {
  handleFilterClick: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;

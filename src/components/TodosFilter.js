import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodosFilter = ({ selectedFilter, handleFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classnames({
          selected: selectedFilter === 'all',
        })}
        name="all"
        onClick={handleFilter}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classnames({
          selected: selectedFilter === 'active',
        })}
        name="active"
        onClick={handleFilter}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classnames({
          selected: selectedFilter === 'completed',
        })}
        name="completed"
        onClick={handleFilter}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default TodosFilter;

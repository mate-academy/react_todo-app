import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTERS } from '../constants';

export const TodosFilter = ({ handleFilter, selectedFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({ selected: selectedFilter === FILTERS.all })}
        onClick={() => handleFilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({ selected: selectedFilter === FILTERS.all })}
        onClick={() => handleFilter(FILTERS.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({ selected: selectedFilter === FILTERS.all })}
        onClick={() => handleFilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

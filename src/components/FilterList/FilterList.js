import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTER_TYPES } from '../../constants';

export const FilterList = ({ setFilter, selectedTodos }) => (
  <ul className="filters">
    {Object.values(FILTER_TYPES).map(filter => (
      <li key={filter} className="filter">
        <a
          href={`#/${filter}`}
          onClick={() => setFilter(filter)}
          className={classNames({
            selected: selectedTodos === filter,
          })}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

FilterList.propTypes = {
  selectedTodos: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

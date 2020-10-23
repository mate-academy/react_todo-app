import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const FilterTodos = ({
  FILTERS,
  filterValue,
  setFilterValue,
}) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: filterValue === FILTERS.all,
        })}
        onClick={() => {
          setFilterValue(FILTERS.all);
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: filterValue === FILTERS.active,
        })}
        onClick={() => {
          setFilterValue(FILTERS.active);
        }}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: filterValue === FILTERS.completed,
        })}
        onClick={() => {
          setFilterValue(FILTERS.completed);
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);

FilterTodos.propTypes = {
  FILTERS: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  filterValue: PropTypes.string.isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodosFilter = ({ filterTypes, filtered, filter }) => (
  <ul className="filters">
    {filterTypes.map(filterType => (
      <li key={filterType}>
        <button
          type="button"
          className={
            classNames({ selected: filter === filterType })
          }
          data-filter={filterType}
          onClick={evt => filtered(evt.target.getAttribute('data-filter'))}
        >
          {filterType}
        </button>
      </li>
    ))}
  </ul>
);

TodosFilter.propTypes = {
  filterTypes: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  filtered: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;

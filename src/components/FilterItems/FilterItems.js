import React from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export const FilterItems = ({ filterTypes, filtered, filter }) => (
  <ul className="filters">
    {filterTypes.map((filterType) => {
      let filterItem = filterType;

      switch (filterItem) {
        case 'Active':
          filterItem = false;
          break;

        case 'Completed':
          filterItem = true;
          break;
        default:
          filterItem = 'All';
          break;
      }

      return (
        <li key={filterType}>
          <button
            type="button"
            className={
              cx({ selected: filter === filterItem })
            }
            data-filter={filterType}
            onClick={filtered}
          >
            {filterType}
          </button>
        </li>
      );
    })}
  </ul>
);

FilterItems.propTypes = {
  filterTypes: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  filtered: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

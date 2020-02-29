import React from 'react';
import './Filter.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, filterState, clearCompleted }) => (
  <>
    <ul className="filters">
      <li>
        <button
          className={filterState === 'All'
            ? 'filters__active filters__button'
            : 'filters__button'
          }
          type="button"
          onClick={() => filter('All')}
        >
          All
        </button>
      </li>

      <li>
        <button
          className={filterState === 'Active'
            ? 'filters__active filters__button'
            : 'filters__button'
          }
          type="button"
          onClick={() => filter('Active')}
        >
          Active
        </button>
      </li>

      <li>
        <button
          className={filterState === 'Completed'
            ? 'filters__active filters__button'
            : 'filters__button'
          }
          type="button"
          onClick={() => filter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={() => clearCompleted()}
    >
    Clear completed
    </button>
  </>
);

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  filterState: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Filters = ({ setFilterStatus, filterStatus, activeSelectAll }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={classNames('filter', {
          selected: filterStatus === 'all',
        })}
        onClick={() => setFilterStatus('all')}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames('filter', {
          selected: filterStatus === 'active',
        })}
        onClick={() => setFilterStatus('active')}
      >
        Active
      </button>
    </li>

    {activeSelectAll && (
      <li>
        <button
          type="button"
          className={classNames('filter', {
            selected: filterStatus === 'completed',
          })}
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </button>
      </li>
    )}

  </ul>
);

Filters.propTypes = {
  setFilterStatus: PropTypes.func.isRequired,
  activeSelectAll: PropTypes.bool.isRequired,
  filterStatus: PropTypes.string.isRequired,
};

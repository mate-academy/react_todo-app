import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTERS } from '../../js/filtersNames';

export const Filters = ({
  setFilterStatus,
  filterStatus,
  haveCompletedTodos,
}) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={classNames('filter', {
          selected: filterStatus === FILTERS.all,
        })}
        onClick={() => setFilterStatus(FILTERS.all)}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames('filter', {
          selected: filterStatus === FILTERS.active,
        })}
        onClick={() => setFilterStatus(FILTERS.active)}
      >
        Active
      </button>
    </li>

    {haveCompletedTodos && (
      <li>
        <button
          type="button"
          className={classNames('filter', {
            selected: filterStatus === FILTERS.completed,
          })}
          onClick={() => setFilterStatus(FILTERS.completed)}
        >
          Completed
        </button>
      </li>
    )}

  </ul>
);

Filters.propTypes = {
  setFilterStatus: PropTypes.func.isRequired,
  haveCompletedTodos: PropTypes.bool.isRequired,
  filterStatus: PropTypes.string.isRequired,
};

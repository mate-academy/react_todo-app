import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { filtersNames } from '../../js/filtersNames';

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
          selected: filterStatus === filtersNames.all,
        })}
        onClick={() => setFilterStatus(filtersNames.all)}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames('filter', {
          selected: filterStatus === filtersNames.active,
        })}
        onClick={() => setFilterStatus(filtersNames.active)}
      >
        Active
      </button>
    </li>

    {haveCompletedTodos && (
      <li>
        <button
          type="button"
          className={classNames('filter', {
            selected: filterStatus === filtersNames.completed,
          })}
          onClick={() => setFilterStatus(filtersNames.completed)}
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

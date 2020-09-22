import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants';

export const TodosFilter = ({
  filter,
  setFilter,
}) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={cn({ selected: filter === FILTERS.all })}
        onClick={() => setFilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={cn({ selected: filter === FILTERS.active })}
        onClick={() => setFilter(FILTERS.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={cn({ selected: filter === FILTERS.completed })}
        onClick={() => setFilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

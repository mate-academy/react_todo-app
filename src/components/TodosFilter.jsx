import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { FILTERS } from './constants';

export function TodosFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={ClassNames({
            selected: filter === FILTERS.all,
          })}
          onClick={() => setFilter(FILTERS.all)}
        >
          {FILTERS.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={ClassNames({
            selected: filter === FILTERS.active,
          })}
          onClick={() => setFilter(FILTERS.active)}
        >
          {FILTERS.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={ClassNames({
            selected: filter === FILTERS.completed,
          })}
          onClick={() => setFilter(FILTERS.completed)}
        >
          {FILTERS.completed}
        </a>
      </li>
    </ul>
  );
}

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

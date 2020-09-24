import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { FILTER } from '../constants/constants';

export const TodosFilter = ({ filter, setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={ClassNames({
          selected: filter === FILTER.all,
        })}
        onClick={() => setFilter(FILTER.all)}
      >
        {FILTER.all}
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={ClassNames({
          selected: filter === FILTER.active,
        })}
        onClick={() => setFilter(FILTER.active)}
      >
        {FILTER.active}
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={ClassNames({
          selected: filter === FILTER.completed,
        })}
        onClick={() => setFilter(FILTER.completed)}
      >
        {FILTER.completed}
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

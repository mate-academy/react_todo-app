import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FILTER } from '../constants';

export const TodosFilter = ({ filter, setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
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
        className={classNames({
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
        className={classNames({
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
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

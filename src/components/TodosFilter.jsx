import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Filter } from '../constants/Filter';

export const TodosFilter = ({ setFilter, filterValue }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: filterValue === Filter.all,
        })}
        onClick={e => setFilter(e.target.innerText)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: filterValue === Filter.active,
        })}
        onClick={e => setFilter(e.target.innerText)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: filterValue === Filter.completed,
        })}
        onClick={e => setFilter(e.target.innerText)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodosFilter = ({ setFilter, filterValue }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: filterValue === 'All',
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
          selected: filterValue === 'Active',
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
          selected: filterValue === 'Completed',
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

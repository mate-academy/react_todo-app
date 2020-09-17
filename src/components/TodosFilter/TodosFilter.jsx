import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodosFilter = ({ todos, filter, setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: filter === 'All',
        })}
        onClick={event => setFilter(event.target.innerText)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: filter === 'Active',
        })}
        onClick={event => setFilter(event.target.innerText)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: filter === 'Completed',
        })}
        onClick={event => setFilter(event.target.innerText)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

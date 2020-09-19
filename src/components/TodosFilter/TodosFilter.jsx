import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodosFilter = ({ all, active, completed, filter, setFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: filter === all,
        })}
        onClick={() => setFilter(all)}
      >
        {all}
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: filter === active,
        })}
        onClick={() => setFilter(active)}
      >
        {active}
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: filter === completed,
        })}
        onClick={() => setFilter(completed)}
      >
        {completed}
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  all: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
};

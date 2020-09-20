import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const TodosFilter = ({ setfilter, FILTERS, filter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classnames({ selected: filter === FILTERS.all })}
        onClick={() => setfilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classnames({ selected: filter === FILTERS.active })}
        onClick={() => setfilter(FILTERS.active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classnames({ selected: filter === FILTERS.completed })}
        onClick={() => setfilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  setfilter: PropTypes.func.isRequired,
  FILTERS: PropTypes.objectOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
};

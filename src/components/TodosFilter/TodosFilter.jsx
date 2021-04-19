import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../styles/filters.css';

export const TodosFilter = ({ status, setStatus, FILTERS }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        onClick={() => setStatus(FILTERS.all)}
        className={classNames(
          { selected: status === FILTERS.all },
        )}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        onClick={() => setStatus(FILTERS.active)}
        className={classNames(
          { selected: status === FILTERS.active },
        )}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        onClick={() => setStatus(FILTERS.completed)}
        className={classNames(
          { selected: status === FILTERS.completed },
        )}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  FILTERS: PropTypes.shape({
    all: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};

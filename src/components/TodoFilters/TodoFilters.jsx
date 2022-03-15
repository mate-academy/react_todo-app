import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodoFilters = ({ FILTERS, setTodosFilter, todosFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classnames({
          selected: todosFilter === FILTERS.all,
        })}
        onClick={() => setTodosFilter(FILTERS.all)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classnames({
          selected: todosFilter === FILTERS.active,
        })}
        onClick={() => setTodosFilter(FILTERS.active)}

      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classnames({
          selected: todosFilter === FILTERS.completed,
        })}
        onClick={() => setTodosFilter(FILTERS.completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilters.propTypes = {
  setTodosFilter: PropTypes.func.isRequired,
  todosFilter: PropTypes.string.isRequired,
  FILTERS: PropTypes.shape({
    all: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};

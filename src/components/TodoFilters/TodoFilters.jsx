import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodoFilters = ({ filterTodosByStatus, activeFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classnames({
          selected: activeFilter === 'all',
        })}
        onClick={() => {
          filterTodosByStatus('all');
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classnames({
          selected: activeFilter === 'active',
        })}
        onClick={() => {
          filterTodosByStatus('active');
        }}

      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classnames({
          selected: activeFilter === 'completed',
        })}
        onClick={() => {
          filterTodosByStatus('completed');
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilters.propTypes = {
  filterTodosByStatus: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
};

TodoFilters.defaultProps = {
  activeFilter: 'all',
};

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TodosFilter = ({ showParam, updateTodosToShow }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: showParam === 'all',
        })}
        onClick={() => (updateTodosToShow('all'))}
      >
        All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        className={classNames({
          selected: showParam === 'active',
        })}
        onClick={() => (updateTodosToShow('active'))}
      >
        Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: showParam === 'completed',
        })}
        onClick={() => (updateTodosToShow('completed'))}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  showParam: PropTypes.string.isRequired,
  updateTodosToShow: PropTypes.func.isRequired,
};

export default TodosFilter;

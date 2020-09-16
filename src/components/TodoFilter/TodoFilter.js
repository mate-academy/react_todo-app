import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoFilter = ({ todosType, selectTodosType }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: todosType === 'All',
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: todosType === 'Active',
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: todosType === 'Completed',
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  todosType: PropTypes.string.isRequired,
  selectTodosType: PropTypes.func.isRequired,
};

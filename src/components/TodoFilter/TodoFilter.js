import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoFilter = ({
  todosType,
  selectTodosType,
  all,
  active,
  completed,
}) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: todosType === all,
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        {all}
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: todosType === active,
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        {active}
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: todosType === completed,
        })}
        onClick={event => selectTodosType(event.target.innerText)}
      >
        {completed}
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  todosType: PropTypes.string.isRequired,
  selectTodosType: PropTypes.func.isRequired,
  all: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
};

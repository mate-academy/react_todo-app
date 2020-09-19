import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FILTER } from '../../constants';

export const TodoFilter = ({ todosType, selectTodosType }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: todosType === FILTER.all,
        })}
        onClick={() => selectTodosType(FILTER.all)}
      >
        {FILTER.all}
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: todosType === FILTER.active,
        })}
        onClick={() => selectTodosType(FILTER.active)}
      >
        {FILTER.active}
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: todosType === FILTER.completed,
        })}
        onClick={() => selectTodosType(FILTER.completed)}
      >
        {FILTER.completed}
      </a>
    </li>
  </ul>
);

TodoFilter.propTypes = {
  todosType: PropTypes.string.isRequired,
  selectTodosType: PropTypes.func.isRequired,
};

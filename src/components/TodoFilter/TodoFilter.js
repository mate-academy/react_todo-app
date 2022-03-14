import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FILTER } from '../../constants';

export const TodoFilter = ({ todosType, selectTodosType }) => {
  const buttons = Object.values(FILTER);

  return (
    <ul className="filters">
      {buttons.map(button => (
        <li>
          <a
            href={`#/${button}`}
            className={classNames({
              selected: todosType === button,
            })}
            onClick={() => selectTodosType(button)}
          >
            {button}
          </a>
        </li>
      ))}
    </ul>
  );
};

TodoFilter.propTypes = {
  todosType: PropTypes.string.isRequired,
  selectTodosType: PropTypes.func.isRequired,
};

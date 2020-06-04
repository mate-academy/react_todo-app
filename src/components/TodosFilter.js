import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TodosFilter = ({ todosToShow, actualFilter, toggleActiveTodos }) => (
  <li>
    <a
      href={`#/${actualFilter}`}
      className={classnames({ selected: actualFilter === todosToShow })}
      onClick={() => toggleActiveTodos(actualFilter)}
    >
      {actualFilter}
    </a>
  </li>
);

TodosFilter.propTypes = {
  todosToShow: propTypes.string.isRequired,
  actualFilter: propTypes.string.isRequired,
  toggleActiveTodos: propTypes.func.isRequired,
};

export default TodosFilter;

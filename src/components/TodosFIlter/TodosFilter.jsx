import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({ uncomplitedTodos }) => (
  <>
    <span className="todo-count">
      {`${uncomplitedTodos.length}
        ${uncomplitedTodos.length !== 1 ? 'items' : 'item'} left`
      }
    </span>

    <ul className="filters">
      <li>
        <a href="#/" className="selected">All</a>
      </li>

      <li>
        <a href="#/active">Active</a>
      </li>

      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>

    <button type="button" className="clear-completed">
      Clear completed
    </button>
  </>
);

TodosFilter.propTypes = {
  uncomplitedTodos: PropTypes.arrayOf(PropTypes.object),
};

TodosFilter.defaultProps = {
  uncomplitedTodos: [],
};

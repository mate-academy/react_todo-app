import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({ activeTodos }) => {
  const active = activeTodos;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${active} items left`}
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
    </footer>
  );
};

TodosFilter.propTypes = {
  activeTodos: PropTypes.number.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './Button/Button';

export const Footer = (props) => {
  const {
    setFilter,
    activeTodos,
    handleClearCompleted,
    showActiveTodosCount,
  } = props;

  return (
    <footer
      className="footer"
    >
      <span
        className="todo-count"
      >
        {showActiveTodosCount}
      </span>

      <ul
        className="filters"
      >
        <li>
          <Button
            setFilter={setFilter}
            activeTodos={activeTodos}
            status="all"
            title="All"
          />
        </li>

        <li>
          <Button
            setFilter={setFilter}
            activeTodos={activeTodos}
            status="active"
            title="Active"
          />
        </li>

        <li>
          <Button
            setFilter={setFilter}
            activeTodos={activeTodos}
            status="completed"
            title="Completed"
          />
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  activeTodos: PropTypes.string.isRequired,
  showActiveTodosCount: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};

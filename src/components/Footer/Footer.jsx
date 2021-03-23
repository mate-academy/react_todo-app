import React from 'react';
import PropTypes from 'prop-types';
import { Filters } from '../Filters/Filters';

export const Footer = ({ activeTodos,
  completedTodos,
  clearCompletedTodos }) => (
  <footer className="footer">
    <span className="todo-count">
      {activeTodos.length}
      {' '}
        items left
      </span>

    <Filters />

    {completedTodos.length > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    )
    }
  </footer>
);

Footer.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  completedTodos: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
};

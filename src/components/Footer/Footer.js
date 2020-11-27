import React from 'react';
import PropTypes from 'prop-types';
import { Filters } from '../Filters';

export const Footer = ({
  filteredTodos,
  setFilterStatus,
  filterStatus,
  activeSelectAll,
  clearAllCompleted,
}) => (
  <footer className="footer">
    {!!filteredTodos.length && (
      <span className="todo-count">
        {`${filteredTodos.length} item(s) left`}
      </span>
    )}

    <Filters
      setFilterStatus={setFilterStatus}
      filterStatus={filterStatus}
      activeSelectAll={activeSelectAll}
    />

    {activeSelectAll && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearAllCompleted}
      >
        Clear completed tasks
      </button>
    )}

  </footer>
);

Footer.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  activeSelectAll: PropTypes.bool.isRequired,
  clearAllCompleted: PropTypes.func.isRequired,
};

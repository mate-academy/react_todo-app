import React from 'react';
import PropTypes from 'prop-types';
import { Filters } from '../Filters';

export const Footer = ({
  completedTodosQty,
  setFilterStatus,
  filterStatus,
  clearAllCompleted,
}) => (
  <footer className="footer">
    {!!completedTodosQty && (
      <span className="todo-count">
        {`${completedTodosQty} item(s) left`}
      </span>
    )}

    <Filters
      setFilterStatus={setFilterStatus}
      filterStatus={filterStatus}
      haveCompletedTodos={!!completedTodosQty}
    />

    {!!completedTodosQty && (
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
  completedTodosQty: PropTypes.number.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  clearAllCompleted: PropTypes.func.isRequired,
};

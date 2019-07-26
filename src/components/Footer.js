import React from 'react';
import PropTypes from 'prop-types';

import StatusFilter from './StatusFilter';

const Footer = ({
  todos,
  onFilterChange,
  handleDeleteAllCompleted,
  toDoCount,
  filter,
}) => {
  const compltetedTodos = todos.filter(todo => todo.complete);

  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {toDoCount}
        {' '}
        items left
      </span>

      <StatusFilter onFilterChange={onFilterChange} filter={filter} />

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={handleDeleteAllCompleted}
      >
        {compltetedTodos.length > 0 ? 'Clear completed' : ''}
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  handleDeleteAllCompleted: PropTypes.func.isRequired,
  toDoCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;

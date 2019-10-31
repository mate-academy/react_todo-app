import React from 'react';
import PropTypes from 'prop-types';
import ClearBtn from './ClearBtn';

function ControlPanel({ items, handleFilter, clearCompleted }) {
  if (items.length > 0) {
    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {items.length}
          items left
        </span>

        <ul className="filters">
          <li>
            <a onClick={handleFilter} href="#/" className="selected">All</a>
          </li>

          <li>
            <a onClick={handleFilter} href="#/active">Active</a>
          </li>

          <li>
            <a onClick={handleFilter} href="#/completed">Completed</a>
          </li>
        </ul>

        <ClearBtn items={items} clearCompleted={clearCompleted} />
      </footer>
    );
  }

  return '';
}

ControlPanel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ControlPanel;

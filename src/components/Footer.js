import React from 'react';

const Footer = props => {
  const { todosTotal, changeFilter, filter } = props;
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        <strong>{todosTotal}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={`btn-filter ${filter === 'all' ? 'selected' : ''}`}
            onClick={() => {
              changeFilter('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`btn-filter ${filter === 'active' ? 'selected' : ''}`}
            onClick={() => {
              changeFilter('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`btn-filter ${filter === 'completed' ? 'selected' : ''}`}
            onClick={() => {
              changeFilter('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" style={{ display: 'block' }}></button>
    </footer>
  );
};

export default Footer;

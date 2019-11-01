import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  active, filter, completed, onFilter, onClear,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {`${active} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filter === 'all' ? 'selected' : undefined}
          onClick={() => onFilter('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : undefined}
          onClick={() => onFilter('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filter === 'completed' ? 'selected' : undefined}
          onClick={() => onFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
      onClick={onClear}
    >
      {completed && 'Clear completed'}
    </button>
  </footer>
);

Footer.propTypes = {
  active: PropTypes.number,
  filter: PropTypes.string,
  completed: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  active: 0,
  completed: false,
  filter: 'all',
};

export default Footer;

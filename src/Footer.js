import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const { todos, clearCompleted, setFilter,
    selectedFilter, FILTER_TYPES } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        items left
        {' '}
        {todos.filter(item => !item.completed).length}
      </span>
      <ul className="filters">
        {[...Object.values(FILTER_TYPES)].map(filter => (
          <li>
            <a
              href="#/"
              className={selectedFilter === filter
                ? 'selected' : ''}
              onClick={() => setFilter(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      {todos.some(item => item.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
          style={{ display: 'block' }
          }
        >
          {' '}
          Clear completed
          {' '}
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  FILTER_TYPES: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Footer;

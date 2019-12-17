import React from 'react';
import PropTypes from 'prop-types';

const Filters
  // eslint-disable-next-line max-len
  = ({ filters, list, clearCompleted, filterTabs, activeFilter, lengthFilteredTodos }) => (

    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        items left&nbsp;
        {lengthFilteredTodos}
      </span>

      <ul className="filters">
        {Object.values(filters).map(item => (
          <li key={item}>
            <a
              style={{ cursor: 'hand' }}
              href="#/"
              className={activeFilter === item
                ? 'selected'
                : ''}
              onClick={() => filterTabs(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
        style={list.filter(task => task.completed).length > 0
          ? { display: 'block' }
          : { display: 'none' }}
      >
          Clear completed
      </button>
    </footer>
  );

Filters.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.object),
  clearCompleted: PropTypes.func.isRequired,
  filterTabs: PropTypes.func.isRequired,
  activeFilter: PropTypes.arrayOf(PropTypes.string),
  lengthFilteredTodos: PropTypes.number,
};

Filters.defaultProps = {
  filters: [],
  list: [],
  activeFilter: [],
  lengthFilteredTodos: null,
};

export default Filters;

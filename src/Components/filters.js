import React from 'react';
import PropTypes from 'prop-types';

const Filters
  = ({ filters, list, clearCompleted, filterTabs, activeFilter }) => (

    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        items left&nbsp;
        {list.filter(item => item.completed === false).length}
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

};

Filters.defaultProps = {
  filters: [],
  list: [],
  activeFilter: [],
};

export default Filters;

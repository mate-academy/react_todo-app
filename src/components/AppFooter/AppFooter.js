import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from '../TodoFilter/TodoFilter';

function AppFooter(props) {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {props.items.filter(item => item.completed === false).length}
        {' '}
          items left
      </span>

      <TodosFilter
        onFilterChange={props.onFilterChange}
        filterState={props.filterState}
      />

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={props.handleClear}
      >
        Clear completed
      </button>
    </footer>
  );
}

AppFooter.defaultProps = {
  items: [],
  handleClear: {},
  onFilterChange: {},
  filterState: 'All',
};

AppFooter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handleClear: PropTypes.func,
  onFilterChange: PropTypes.func,
  filterState: PropTypes.string,
};

export default AppFooter;

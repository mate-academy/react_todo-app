import React from 'react';
import PropTypes from 'prop-types';
import TodoFilters from './TodoFilters';

const Footer = ({
  todos,
  todosLeft,
  clearCompletedItems,
  selectedFilterItem,
  setItemFilter,
}) => (
  <footer
    className="footer"
    style={{ display: 'block' }}
  >
    <span className="todo-count">
      Items Left:
      {' '}
      {todosLeft}
    </span>

    <TodoFilters
      selectedFilterItem={selectedFilterItem}
      setItemFilter={setItemFilter}
    />

    {todos.some(item => item.completed) && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={clearCompletedItems}
      >
          Clear Completed
      </button>
    )}
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  todosLeft: PropTypes.number.isRequired,
  selectedFilterItem: PropTypes.string.isRequired,
  clearCompletedItems: PropTypes.func.isRequired,
  setItemFilter: PropTypes.func.isRequired,
};

export default Footer;

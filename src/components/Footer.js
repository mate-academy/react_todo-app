import React from 'react';
import PropTypes from 'prop-types';
import TodoFilters from './TodoFilters';

const Footer = ({
  todosFooter,
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

    {todosFooter.some(item => item.completed) && (
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
  todosFooter: PropTypes.arrayOf(PropTypes.object).isRequired,
  todosLeft: PropTypes.number.isRequired,
  selectedFilterItem: PropTypes.string.isRequired,
  clearCompletedItems: PropTypes.func.isRequired,
  setItemFilter: PropTypes.func.isRequired,
};

export default Footer;

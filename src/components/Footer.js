import React from 'react';
import PropTypes from 'prop-types';

const filtersList = [
  { filterName: 'all', filterText: 'All' },
  { filterName: 'active', filterText: 'Active' },
  { filterName: 'completed', filterText: 'Completed' }
];

const Footer = ({ todos, handleFilter, clearCompletedTodos }) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length} items left
            </span>
    <ul className="filters">
      {filtersList.map((filterItem) =>
        <li key={filterItem.filterName}>
          <a
            // className="selected"
            onClick={() => handleFilter(filterItem.filterName)}
            href="#/"
          >
            {filterItem.filterText}
          </a>
        </li>)}
    </ul>
    <button
      type="button"
      className="clear-completed"
      style={todos
        .some(todo => todo.completed)
        ? { display: 'block' }
        : { display: 'none' }}
      onClick={clearCompletedTodos}
    >
      Clear completed
            </button>
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  handleFilter: PropTypes.func,
  clearCompletedTodos: PropTypes.func,
};

export default Footer;




import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = ({
  todos,
  setFilter,
  removeAllCompleted,
  filterTypes,
  currentFilter,
}) => (

  <footer
    className="footer"
    style={todos.length > 0 ? { display: 'block' } : { display: 'none' }}
  >
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
items left
    </span>

    <TodosFilter
      setFilter={setFilter}
      filterTypes={filterTypes}
      currentFilter={currentFilter}
    />

    <button
      type="button"
      className="clear-completed"
      onClick={removeAllCompleted}
      style={todos.filter(todo => todo.completed).length > 0
        ? { display: 'block' }
        : { display: 'none' }}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilter: PropTypes.func.isRequired,
  removeAllCompleted: PropTypes.func.isRequired,
  filterTypes: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default Footer;

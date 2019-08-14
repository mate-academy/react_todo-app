import React from 'react';
import PropTypes from 'prop-types';

const FilterBy = ({
  sortFieldTodo, todos, sortField, clearCompleted,
}) => (

  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {(todos.filter(todo => todo.completed === false)).length}
        items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={(sortField === 'All') ? 'selected' : ''}
          onClick={() => sortFieldTodo('All')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => sortFieldTodo('Active')}
          className={(sortField === 'Active') ? 'selected' : ''}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => sortFieldTodo('Completed')}
          className={(sortField === 'Completed') ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  </footer>
);

FilterBy.propTypes = {
  sortFieldTodo: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  sortField: PropTypes.func,
  clearCompleted: PropTypes.func,
}.isRequired;

export default FilterBy;

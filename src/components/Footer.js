import React from 'react';
import PropTypes from 'prop-types';

const Footer = (
  { todos, FILTER_TYPES, filter, filterHandler, removeCompleted }
) => (

  <footer
    className="footer"
    style={{ display: todos.length ? '' : 'none' }}
  >
    <span className="todo-count">
      {`
        ${todos.filter(todo => !todo.completed).length}
        items left`
      }
    </span>

    <ul className="filters">
      {Object.values(FILTER_TYPES).map(item => (
        <li>
          <a
            href="#/"
            className={filter === item ? 'selected' : ''}
            onClick={() => filterHandler(item)}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={removeCompleted}
    >
      {todos.find(todo => todo.completed)
        ? 'Clear completed' : ''}
    </button>
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
  FILTER_TYPES: PropTypes.objectOf.isRequired,
  filter: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired,
  removeCompleted: PropTypes.func.isRequired,
};

export default Footer;

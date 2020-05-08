import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';

const Footer = ({
  noComlpetedTodo,
  onFilteredTodos,
  clearCompleted,
  visibleClearCompleted,
  filterType,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {noComlpetedTodo}
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: filterType === 'All' })}
          onClick={e => onFilteredTodos(e.target.text)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: filterType === 'Active' })}
          onClick={e => onFilteredTodos(e.target.text)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: filterType === 'Completed' })}
          onClick={e => onFilteredTodos(e.target.text)}
        >
          Completed
        </a>
      </li>
    </ul>
    {visibleClearCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )
    }
  </footer>
);

Footer.propTypes = {
  noComlpetedTodo: PropTypes.number.isRequired,
  onFilteredTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  visibleClearCompleted: PropTypes.bool.isRequired,
  filterType: PropTypes.string.isRequired,
};

export default Footer;

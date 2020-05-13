import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Footer = (props) => {
  const {
    filterTodo,
    clearCompletedTodos,
    filter,
    countActive,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${countActive} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => (filterTodo('All'))}
            className={ClassNames({
              selected: filter === 'All',
            })}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            onClick={() => (filterTodo('Active'))}
            className={ClassNames({
              selected: filter === 'Active',
            })}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            onClick={() => (filterTodo('Completed'))}
            className={ClassNames({
              selected: filter === 'Completed',
            })}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => clearCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filterTodo: PropTypes.func.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
  countActive: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Footer;

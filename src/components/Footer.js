
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({
  todos,
  chooseTypeTodos,
  isActiveTodos,
  isAllTodos,
  isCompletedTodos,
  deleteCompletedTodos,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {todos
        .filter(todo => !todo.completed)
        .length
      }
      {' '}
      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          title="all"
          className={classNames({ selected: isAllTodos })}
          onClick={chooseTypeTodos}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          title="active"
          className={classNames({ selected: isActiveTodos })}
          onClick={chooseTypeTodos}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          title="completed"
          className={classNames({ selected: isCompletedTodos })}
          onClick={chooseTypeTodos}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={deleteCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  chooseTypeTodos: PropTypes.func.isRequired,
  deleteCompletedTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
  isActiveTodos: PropTypes.string.isRequired,
  isAllTodos: PropTypes.string.isRequired,
  isCompletedTodos: PropTypes.string.isRequired,
};

export default Footer;

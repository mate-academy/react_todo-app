import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodosFilter = ({
  todosLeft,
  showTodos,
  clearCompleted,
  completedTodos,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${todosLeft} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={(event) => {
            event.preventDefault();
            showTodos('all');
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={(event) => {
            event.preventDefault();
            showTodos(false);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={(event) => {
            event.preventDefault();
            showTodos(true);
          }}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className={classNames({
        'clear-completed': true,
        'clear-visibility': !completedTodos,
      })}
      onClick={() => clearCompleted()}
    >
      Clear completed
    </button>
  </footer>
);

TodosFilter.propTypes = {
  todosLeft: PropTypes.number.isRequired,
  showTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completedTodos: PropTypes.bool.isRequired,
};

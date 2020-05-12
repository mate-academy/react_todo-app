import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = (props) => {
  const {
    todos,
    showTodos,
    showTodoStatus,
    deleteAllCompleted,
  } = props;

  const completedTodos = todos.some(todo => todo.completed === true);
  const todoCount = todos.filter(todo => !todo.completed).length;

  const allSelector = classNames({ selected: (showTodos === 'all') });
  const activeSelector = classNames({ selected: (showTodos === 'active') });
  const completedSelector = classNames({ selected: (
    (showTodos === 'completed')
  ) });

  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            onClick={() => showTodoStatus('all')}
            href="#/"
            className={allSelector}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => showTodoStatus('active')}
            href="#/active"
            className={activeSelector}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => showTodoStatus('completed')}
            href="#/completed"
            className={completedSelector}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos && (
        <button
          onClick={deleteAllCompleted}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  showTodos: PropTypes.string.isRequired,
  deleteAllCompleted: PropTypes.func.isRequired,
  showTodoStatus: PropTypes.func.isRequired,
};

export default Footer;

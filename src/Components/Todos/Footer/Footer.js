import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = (props) => {
  const {
    todos,
    deleteAllCompleted,
    showActive,
    isAll,
    isActive,
    isCompleted,
    showCompleted,
    showAll,
  } = props;

  const todoCount = todos.filter(todo => !todo.completed).length;
  const allSelector = classNames('', { selected: isAll });
  const activeSelector = classNames('', { selected: isActive });
  const completedSelector = classNames('', { selected: isCompleted });

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
            onClick={showAll}
            href="#/"
            className={allSelector}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={showActive}
            href="#/active"
            className={activeSelector}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={showCompleted}
            href="#/completed"
            className={completedSelector}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.length > 0 ? (
        <button
          onClick={deleteAllCompleted}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      ) : null}
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
  deleteAllCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  isAll: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
};

export default Footer;

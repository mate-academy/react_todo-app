/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quote-props */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = (props) => {
  const { todos,
    deleteAllCompleted,
    showActive,
    isAll,
    isActive,
    isCompleted,
    showCompleted,
    showAll } = props;

  const oneTodo = todos.filter(todo => !todo.completed).length;
  const handleAllSelector = classNames('', { 'selected': isAll });
  const handleActiveSelector = classNames('', { 'selected': isActive });
  const handleCompletedSelector = classNames('', { 'selected': isCompleted });

  return (
    <footer className="footer">
      <span className="todo-count">
        {oneTodo} items left
      </span>

      <ul className="filters">
        <li onClick={showAll}>
          <a href="#/" className={handleAllSelector}>All</a>
        </li>

        <li onClick={showActive}>
          <a href="#/active" className={handleActiveSelector}>Active</a>
        </li>

        <li onClick={showCompleted}>
          <a href="#/completed" className={handleCompletedSelector}>
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

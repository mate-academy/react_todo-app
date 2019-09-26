import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {
    todos,
    selected,
    onClickAllTodos,
    onClickActive,
    onClickCompleted,
    onClickClearCompleted,
  } = props;

  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {todos.length}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={selected === 'all' ? 'selected' : ''}
            onClick={onClickAllTodos}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={selected === 'active' ? 'selected' : ''}
            onClick={onClickActive}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={selected === 'completed' ? 'selected' : ''}
            onClick={onClickCompleted}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.filter(todo => todo.completed).length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClickClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selected: PropTypes.string.isRequired,
  onClickAllTodos: PropTypes.func.isRequired,
  onClickActive: PropTypes.func.isRequired,
  onClickCompleted: PropTypes.func.isRequired,
  onClickClearCompleted: PropTypes.func.isRequired,
};

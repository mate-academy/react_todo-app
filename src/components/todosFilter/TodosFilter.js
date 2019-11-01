import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  todos,
  initTodos,
  allTodosClick,
  indexTab,
  completedClick,
  clearCompleted,
  activeClick,
}) => (
  <footer className="footer">
    <span className="todo-count">
      { initTodos.length && initTodos.filter(todo => !todo.completed).length }
      { ' items left' }
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={!indexTab ? 'selected' : ''}
          onClick={allTodosClick}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/"
          className={indexTab === 'active' ? 'selected' : ''}
          onClick={activeClick}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={indexTab === 'completed' ? 'selected' : ''}
          onClick={completedClick}
        >
          Completed
        </a>
      </li>
    </ul>

    {todos.filter(todo => todo.completed).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

TodoFilter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  initTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  indexTab: PropTypes.string.isRequired,
  activeClick: PropTypes.func.isRequired,
  completedClick: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  allTodosClick: PropTypes.func.isRequired,
};

export default TodoFilter;

import React from 'react';
import PropTypes from 'prop-types';

const TodoFilter = ({
  todos,
  originTodos,
  allTodosClick,
  indexTab,
  activeClick,
  completedClick,
  clearCompleted,
}) => (
  <footer className="footer">
    <span className="todo-count">
      { originTodos.length
      && originTodos.filter(todo => !todo.completed).length }
      { ' items left' }
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={indexTab === 'all' ? 'selected' : ''}
          onClick={allTodosClick}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          onClick={activeClick}
          className={indexTab === 'active' ? 'selected' : ''}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          onClick={completedClick}
          className={indexTab === 'completed' ? 'selected' : ''}
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
  originTodos: PropTypes.arrayOf(PropTypes.shape({
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

import React from 'react';
import PropTypes from 'prop-types';
import TodoFilter from './TodoFilter';

const TodoFooter = ({ todos, clearCompleted, show, setFilter }) => (
  <footer
    className="footer"
    style={todos.length > 0
      ? { display: 'block' }
      : { display: 'none' }}
  >
    <span className="todo-count">
      {todos.reduce((amount, todo) => (todo.completed
        ? amount
        : amount + 1
      ), 0)}
      {' '}
      items left
    </span>

    <TodoFilter
      show={show}
      setFilter={setFilter}
    />

    {todos.some(todo => todo.completed) && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

TodoFooter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  clearCompleted: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TodoFooter;

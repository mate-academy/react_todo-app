import React from 'react';
import PropTypes from 'prop-types';
import { TodosShape } from '../Shapes/TodosShape';

export const TodoFilter = ({ todos, filterTodos, clear }) => (
  <footer className="footer">
    <span className="todo-count">
      {`${todos.filter(todo => todo.completed === false).length} items left`}
    </span>
    <ul className="filters">
      <li>
        <button
          onClick={() => filterTodos('all')}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filterTodos('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => filterTodos('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
    <button
      type="button"
      className="clear-completed"
      onClick={clear}
    >
      Clear completed
    </button>
  </footer>
);

TodoFilter.propTypes = {
  todos: TodosShape.isRequired,
  filterTodos: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

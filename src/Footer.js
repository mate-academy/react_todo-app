import React from 'react';
import PropTypes from 'prop-types';
import { Todos } from './Shapes';
import { FiltersList } from './FiltersList';

export function Footer({ todos, clearedCompleted, initialTodo, filterType }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${filterType === 'Completed'
          ? initialTodo.filter(todo => todo.completed === false).length
          : todos.filter(todo => todo.completed === false).length} items left`}
      </span>

      <FiltersList />

      <button
        type="button"
        className="clear-completed"
        onClick={() => clearedCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todos: Todos.isRequired,
  clearedCompleted: PropTypes.func.isRequired,
  initialTodo: Todos.isRequired,
  filterType: PropTypes.string.isRequired,
};

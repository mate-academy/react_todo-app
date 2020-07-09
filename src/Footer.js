import React from 'react';
import PropTypes from 'prop-types';
import { Todos } from './Shapes';
import { FiltersList } from './FiltersList';

export function Footer({ todos, clearedCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.length} items left`}
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
};

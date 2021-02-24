import React from 'react';
import PropTypes from 'prop-types';
import { TodoFilter } from '../TodosFilter/TodosFilter';

export const Footer = ({
  completedTodos,
  activeTodos,
  setFilter,
  setTodos,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {activeTodos.length}
      {' '}
      items left
    </span>

    <TodoFilter changeFilter={setFilter} />

    {
      !!completedTodos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(activeTodos)}
        >
          Clear completed
        </button>
      )
    }
  </footer>
);

Footer.propTypes = {
  completedTodos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeTodos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setFilter: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};

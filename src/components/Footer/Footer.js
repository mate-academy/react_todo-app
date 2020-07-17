import React from 'react';
import PropTypes from 'prop-types';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer = ({
  todosAmount,
  notCompletedTodos,
  handleCompletedRemove,
  handleFilterStatusChange,
  activeFilter,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {notCompletedTodos}
      {' '}
      items left
    </span>

    <TodosFilter
      handleFilterStatusChange={handleFilterStatusChange}
      activeFilter={activeFilter}
    />

    {
      todosAmount > notCompletedTodos
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleCompletedRemove}
        >
          Clear completed
        </button>
      )
    }
  </footer>
);

Footer.propTypes = {
  todosAmount: PropTypes.number.isRequired,
  notCompletedTodos: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  handleCompletedRemove: PropTypes.func.isRequired,
  handleFilterStatusChange: PropTypes.func.isRequired,
};

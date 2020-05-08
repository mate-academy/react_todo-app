import React from 'react';
import PropTypes from 'prop-types';
import { FilterList } from '../FilterList';
import './Footer.scss';

export const Footer = (
  { currentFilter, todos, onClearCompleted, onSetFilter },
) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${completedTodos} items left`}
      </span>

      <FilterList
        onFilter={onSetFilter}
        selectedFilter={currentFilter}
      />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

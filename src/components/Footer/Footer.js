import React from 'react';
import PropTypes from 'prop-types';
import { FilterList } from '../FilterList/FilterList';

export const Footer = (
  { selectedTodos, todos, setFilter, onClearCompleted },
) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return todos.length > 0 ? (
    <footer className="footer">
      <span className="todo-count">
        {`${completedTodos} items left`}
      </span>

      <FilterList
        setFilter={setFilter}
        selectedFilter={selectedTodos}
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
  )
    : '';
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  selectedTodos: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

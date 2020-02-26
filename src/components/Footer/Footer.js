import React from 'react';
import PropTypes from 'prop-types';
import { FilterButton } from '../FilterButton/FilterButton';

export const Footer = (props) => {
  const {
    todos,
    currentFilter,
    setFilter,
    clearCompletedTodos,
  } = props;

  return (
    <>
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>
      <ul className="filters">
        <FilterButton
          onClick={() => setFilter('all')}
          selectedFilter={currentFilter}
        >
          All
        </FilterButton>
        <FilterButton
          onClick={() => setFilter('active')}
          selectedFilter={currentFilter}
        >
          Active
        </FilterButton>
        <FilterButton
          onClick={() => setFilter('completed')}
          selectedFilter={currentFilter}
        >
          Completed
        </FilterButton>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,

  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
};

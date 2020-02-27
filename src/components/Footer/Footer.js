import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FilterButton } from '../FilterButton/FilterButton';

export const Footer = (props) => {
  const {
    todos,
    isActiveFilter,
    setFilteredTodos,
    clearCompletedTodos,
  } = props;

  return (
    <>
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>
      <ul className="filters">
        <FilterButton
          className={cx({ selected: isActiveFilter === 'all' })}
          onClick={() => setFilteredTodos('all')}
        >
          All
        </FilterButton>
        <FilterButton
          className={cx({ selected: isActiveFilter === 'active' })}
          onClick={() => setFilteredTodos('active')}
        >
          Active
        </FilterButton>
        <FilterButton
          className={cx({ selected: isActiveFilter === 'completed' })}
          onClick={() => setFilteredTodos('completed')}
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

  setFilteredTodos: PropTypes.func.isRequired,
  isActiveFilter: PropTypes.string.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
};

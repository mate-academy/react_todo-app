import React from 'react';
import PropTypes from 'prop-types';
import Filter from './TodosFilter';

const TodoFooter
  = ({ todos, currentFilter, handleFilter, handleClearButton }) => (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(item => !item.completed).length} items left`}
      </span>
      <ul className="filters">
        <Filter
          handleClick={() => handleFilter('all')}
          selectedFilter={currentFilter}
        >
          All
        </Filter>
        <Filter
          handleClick={() => handleFilter('active')}
          selectedFilter={currentFilter}
        >
          Active
        </Filter>
        <Filter
          handleClick={() => handleFilter('completed')}
          selectedFilter={currentFilter}
        >
          Completed
        </Filter>
      </ul>
      {todos.some(item => item.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearButton}
        >
          Clear completed
        </button>
      )}
    </footer>
  );

TodoFooter.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleClearButton: PropTypes.func.isRequired,
};

export default TodoFooter;

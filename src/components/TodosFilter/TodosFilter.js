import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = (
  {
    todos,
    handleFilter,
    handleClearCompleted,
    isVisible,
  },
) => {
  const onFilter = (filterName) => {
    handleFilter(filterName);
  };

  const onCompleted = () => {
    handleClearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(el => el.completed === false)
          .length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => onFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => onFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => onFilter('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      {isVisible && (
        <button
          type="button"
          className="clear-completed"
          onClick={onCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodosFilter;

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

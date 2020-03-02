import React from 'react';
import PropTypes from 'prop-types';

export const filterButtons = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export const TodosFilter = (props) => {
  const {
    todos,
    filterButtonsChosed,
    filterHandler,
    onClearCompleted,
  } = props;

  const unDoneTodos = todos.filter(todo => todo.completed === false).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {unDoneTodos}
        &nbsp;items left
      </span>

      <ul className="filters">
        {
          Object.values(filterButtons).map(filterButton => (
            <li key={filterButton}>
              <a
                href="#/"
                className={
                  filterButtonsChosed === filterButton ? 'selected' : ''
                }
                onClick={() => filterHandler(filterButton)}
              >
                {filterButton}
              </a>
            </li>
          ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  filterButtonsChosed: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

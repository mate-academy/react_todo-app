import React from 'react';
import PropTypes from 'prop-types';

export const TodosFilter = ({
  filterForTodos,
  setFilterForTodos,
}) => {
  const selectTodosFilter = (event, value) => {
    event.preventDefault();
    setFilterForTodos(value);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterForTodos === 'All' ? 'selected' : ''}
          onClick={event => selectTodosFilter(event, 'All')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterForTodos === 'Active' ? 'selected' : ''}
          onClick={event => selectTodosFilter(event, 'Active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterForTodos === 'Completed' ? 'selected' : ''}
          onClick={event => selectTodosFilter(event, 'Completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  filterForTodos: PropTypes.string.isRequired,
  setFilterForTodos: PropTypes.func.isRequired,
};

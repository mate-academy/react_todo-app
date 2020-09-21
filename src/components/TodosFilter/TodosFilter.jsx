import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

export const TodosFilter = ({
  filterForTodos,
  setFilterForTodos,
  FILTERS,
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
          className={classNames({
            selected: filterForTodos === FILTERS.all,
          })}
          onClick={event => selectTodosFilter(event, FILTERS.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filterForTodos === FILTERS.active,
          })}
          onClick={event => selectTodosFilter(event, FILTERS.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filterForTodos === FILTERS.completed,
          })}
          onClick={event => selectTodosFilter(event, FILTERS.completed)}
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
  FILTERS: PropTypes.shape({
    all: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};

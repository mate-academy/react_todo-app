import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './TodoFilter.css';

const handleFilter = (event, callFilter, criteria) => {
  event.preventDefault();
  callFilter(criteria);
};

export const TodosFilter = (props) => {
  const {
    activeTodos,
    onFilter,
    filter,
    onRemoveCompleted,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: (filter === 'all') })}
            onClick={event => handleFilter(event, onFilter, 'all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: (filter === 'active') })}
            onClick={event => handleFilter(event, onFilter, 'active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: (filter === 'completed') })}
            onClick={event => handleFilter(event, onFilter, 'completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={onRemoveCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

TodosFilter.propTypes = {
  activeTodos: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onRemoveCompleted: PropTypes.func.isRequired,
};

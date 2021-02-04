import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const handleFilter = (event, callFilter, criteria) => {
  event.preventDefault();
  callFilter(criteria);
};

export const TodoFilter = (props) => {
  const [todosCompletedCount, settodosCompletedCount] = useState(0);

  const {
    todos,
    filter,
    onFilter,
    onRemoveCompleted,
  } = props;

  const filterCompleted = todos
    .filter(todo => todo.completed === false)
    .length;

  useEffect(() => {
    settodosCompletedCount(filterCompleted);
  }, [filterCompleted]);

  return (

    <footer className="footer">
      <span className="todo-count">
        {`${todosCompletedCount}  items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: (filter === 'all') })}
            onClick={event => handleFilter(event, onFilter, 'all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/"
            className={classNames({ selected: (filter === 'active') })}
            onClick={event => handleFilter(event, onFilter, 'active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/"
            className={classNames({ selected: (filter === 'completed') })}
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

TodoFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onRemoveCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoFilter.defaultProps = {
  todos: [],
};

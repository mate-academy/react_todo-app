import React, { useState }from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodosFilter = ({
  todosLeft,
  showTodos,
  clearCompleted,
  completedTodos,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <footer className="footer">
      <span className="todo-count">
        {
          (todosLeft===1)
          ? `${todosLeft} item left`
          : `${todosLeft} items left`
        }
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: selectedFilter === 'All',
            })}
            onClick={(event) => {
              event.preventDefault();
              setSelectedFilter('All');
              showTodos('all');
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: selectedFilter === 'Active',
            })}
            onClick={(event) => {
              event.preventDefault();
              setSelectedFilter('Active');
              showTodos(false);
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: selectedFilter === 'Completed',
            })}
            onClick={(event) => {
              event.preventDefault();
              setSelectedFilter('Completed');
              showTodos(true);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className={classNames({
          'clear-completed': true,
          'clear-visibility': !completedTodos,
        })}
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
}

TodosFilter.propTypes = {
  todosLeft: PropTypes.number.isRequired,
  showTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completedTodos: PropTypes.bool.isRequired,
};

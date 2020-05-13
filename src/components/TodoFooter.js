import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodoFooter = ({
  filter,
  clearCompleted,
  itemsLeft,
  clearVisibleButton,
  setFilter,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {`${itemsLeft} items left`}
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          name="All"
          className={classnames({ selected: filter === 'All' })}
          onClick={event => setFilter(event.target.name)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          name="Active"
          className={classnames({ selected: filter === 'Active' })}
          onClick={event => setFilter(event.target.name)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          name="Completed"
          className={classnames({ selected: filter === 'Completed' })}
          onClick={event => setFilter(event.target.name)}
        >
          Completed
        </a>
      </li>
    </ul>

    {clearVisibleButton && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    )}
  </footer>
);

TodoFooter.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearVisibleButton: PropTypes.bool.isRequired,
};

export default TodoFooter;

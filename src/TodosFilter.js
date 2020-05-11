import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = (props) => {
  const { item, handlFilter, filter, deleteCompleted, completed } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {item}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === 'All' ? 'selected' : ''}
            onClick={() => handlFilter('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={filter === 'Active' ? 'selected' : ''}
            onClick={() => handlFilter('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={filter === 'Completed' ? 'selected' : ''}
            onClick={() => handlFilter('Completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      {completed ? (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      ) : ''}

    </footer>
  );
};

TodosFilter.propTypes = {
  completed: PropTypes.func.isRequired,
  item: PropTypes.number.isRequired,
  handlFilter: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;

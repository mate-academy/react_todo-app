import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ item, handlFilter, filter, deleteCompleted }) => (

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

    <button type="button" className="clear-completed" onClick={deleteCompleted}>
      Clear completed
    </button>
  </footer>
);

TodosFilter.propTypes = {
  item: PropTypes.number.isRequired,
  handlFilter: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodosFilter;

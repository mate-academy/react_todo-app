import React from 'react';
import PropTypes from 'prop-types';
import { FILTER_TYPES } from './App';

const TodosFilter = ({
  todos,
  setFilter,
  currentFilter,
  removeCompletedTodos,
}) => (
  <>
    <ul className="filters">
      {Object.values(FILTER_TYPES).map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter}`}
            onClick={() => setFilter(filter)}
            className={currentFilter === filter ? 'selected' : ''}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>
    {todos.filter(todo => todo.isCompleted).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </>
);

TodosFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isCompleted: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
};

export default TodosFilter;

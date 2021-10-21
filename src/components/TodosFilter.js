import React from 'react';
import PropTypes from 'prop-types';
import { filters } from '../filters';

const TodosFilter = ({ onVisibleTodos }) => (
  <ul className="filters">
    {Object.values(filters).map(filter => (
      <li key={filter}>
        <a
          href="#/"
          className="selected"
          onClick={() => (
            onVisibleTodos(filter)
          )}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilter.propTypes = {
  onVisibleTodos: PropTypes.func.isRequired,
};

export default TodosFilter;

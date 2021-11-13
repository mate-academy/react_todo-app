import React from 'react';
import PropTypes from 'prop-types';
import { filters } from '../filters';

const TodosFilter = ({
  onVisibleTodos,
  visibleTodos,
}) => (
  <ul className="filters">
    {Object.values(filters).map(filter => (
      <li key={filter}>
        <a
          href={filter === 'All' ? '#/' : `#/${filter.toLocaleLowerCase()}`}
          className={visibleTodos === filter ? 'selected' : null}
          onClick={() => {
            onVisibleTodos(filter);
          }}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilter.propTypes = {
  onVisibleTodos: PropTypes.func.isRequired,
  visibleTodos: PropTypes.string.isRequired,
};

export default TodosFilter;

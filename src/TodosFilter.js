import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({
  setFilter,
  filterTypes,
  currentFilter,
}) => (
  <ul className="filters">
    {Object.values(filterTypes).map(filter => (
      <li>
        <a
          href="#/"
          onClick={event => setFilter(event.target.innerText)}
          className={currentFilter === filter ? 'selected' : ''}
        >
          {filter}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filterTypes: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TodosFilter;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TodosFilter = ({ selectedFilter, handleFilter }) => {
  const filterButtons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'completed', text: 'Completed' },
  ];

  return (
    <ul className="filters">
      {filterButtons.map(filterButton => (
        <li key={filterButton.name}>
          <a
            href={`#/${filterButton.name === 'all'
              ? ''
              : filterButton.name
            }`}
            className={classnames({
              selected: selectedFilter === filterButton.name,
            })}
            name={filterButton.name}
            onClick={handleFilter}
          >
            {filterButton.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

TodosFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default TodosFilter;

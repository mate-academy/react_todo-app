import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodosFilter = ({ selectedFilter, setFilter }) => {
  const handleFilter = (event) => {
    event.preventDefault();

    setFilter(event.target.name);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classnames({ selected: selectedFilter === 'All' })}
          name="All"
          onClick={handleFilter}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classnames({ selected: selectedFilter === 'Active' })}
          name="Active"
          onClick={handleFilter}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classnames({ selected: selectedFilter === 'Completed' })}
          name="Completed"
          onClick={handleFilter}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

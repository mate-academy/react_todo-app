import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FILTERS } from './Const';

export const TodosFilter = ({ selectedFilter, setSelectedFilter }) => {
  const handleFilter = (event) => {
    event.preventDefault();

    setSelectedFilter(event.target.name);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classnames({ selected: selectedFilter === FILTERS.All })}
          name="All"
          onClick={handleFilter}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classnames(
            { selected: selectedFilter === FILTERS.Active },
          )}
          name="Active"
          onClick={handleFilter}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classnames(
            { selected: selectedFilter === FILTERS.Completed },
          )}
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
  setSelectedFilter: PropTypes.func.isRequired,
};

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodosFilter = ({ setFilter, selectedFilter }) => {
  const changeFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.name);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: selectedFilter === 'All',
          })}
          name="All"
          onClick={changeFilter}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: selectedFilter === 'Active',
          })}
          name="Active"
          onClick={changeFilter}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: selectedFilter === 'Completed',
          })}
          name="Completed"
          onClick={changeFilter}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.func.isRequired,
};

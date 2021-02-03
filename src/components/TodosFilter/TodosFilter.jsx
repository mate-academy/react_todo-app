import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodosFilter = ({ setFilter, selectedFilter }) => {
  const changeFilter = (e) => {
    e.preventDefault();

    setFilter(e.target.name);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classnames({
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
          className={classnames({
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
          className={classnames({
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
  selectedFilter: PropTypes.string.isRequired,
};

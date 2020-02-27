import React from 'react';
import PropTypes from 'prop-types';

import FilterLink from '../FilterLink/FilterLink';

const Filter = ({ activeFilter, onSetFilter }) => (
  <div className="todo-filter">
    <FilterLink
      icon="list"
      active={activeFilter === 'ALL'}
      title="TOTAL TASKS"
      onClick={() => onSetFilter('ALL')}
    />

    <FilterLink
      icon="check_box"
      active={activeFilter === 'COMPLETED'}
      title="COMPLETED"
      onClick={() => onSetFilter('COMPLETED')}
    />

    <FilterLink
      icon="check_box_outline_blank"
      active={activeFilter === 'UNCOMPLETED'}
      title="LEFT"
      onClick={() => onSetFilter('UNCOMPLETED')}
    />
  </div>
);

Filter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

export default Filter;

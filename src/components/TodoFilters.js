import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FILTER_TYPES } from '../App';

const TodoFilters = ({ selectedFilterItem, setItemFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={cn({ selected: selectedFilterItem === 'all' })}
        onClick={() => setItemFilter(FILTER_TYPES.all)}
      >
              All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={cn({ selected: selectedFilterItem === 'active' })}
        onClick={() => setItemFilter(FILTER_TYPES.active)}
      >
              Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={cn({ selected: selectedFilterItem === 'completed' })}
        onClick={() => setItemFilter(FILTER_TYPES.completed)}
      >
                Completed
      </a>
    </li>
  </ul>
);

TodoFilters.propTypes = {
  selectedFilterItem: PropTypes.string.isRequired,
  setItemFilter: PropTypes.func.isRequired,
};

export default TodoFilters;

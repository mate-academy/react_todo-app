import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export const TodosFilter = ({ value, onChange }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({
          selected: value === FILTERS.all,
        })}
        onClick={() => {
          onChange(FILTERS.all);
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({
          selected: value === FILTERS.active,
        })}
        onClick={() => {
          onChange(FILTERS.active);
        }}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({
          selected: value === FILTERS.completed,
        })}
        onClick={() => {
          onChange(FILTERS.completed);
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

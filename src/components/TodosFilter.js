import React from 'react';
import PropTypes from 'prop-types';
import { FILTER } from './const';

export const TodosFilter = ({ selectType, setSelectType }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={selectType === FILTER.all ? 'selected' : ''}
        onClick={() => {
          setSelectType(FILTER.all);
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={selectType === FILTER.active ? 'selected' : ''}
        onClick={() => {
          setSelectType(FILTER.active);
        }}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={selectType === FILTER.completed ? 'selected' : ''}
        onClick={() => {
          setSelectType(FILTER.completed);
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  selectType: PropTypes.bool.isRequired,
  setSelectType: PropTypes.func.isRequired,
};

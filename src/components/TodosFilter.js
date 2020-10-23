import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { FILTERS } from '../constants';
import { getFilterValue } from '../store';
import { setFilterValue } from '../store/filter';

export const TodosFilter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getFilterValue);

  const onChange = (newValue) => {
    const action = setFilterValue(newValue);

    dispatch(action);
  };

  return (
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
};

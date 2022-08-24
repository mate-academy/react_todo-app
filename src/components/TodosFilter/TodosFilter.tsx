import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './TodosFilter.scss';

type Props = {
  showTodos: (param: string) => void,
};

export const TodosFilter: React.FC<Props> = ({ showTodos }) => {
  const [selectFilter, setSelectFilter] = useState('all');

  return (
    <ul className="TodosFilter">
      <li className="TodosFilter__items">
        <NavLink
          className={
            classNames(
              'TodosFilter__link',
              { 'TodosFilter__link--selected': selectFilter === 'all' },
            )
          }
          to="/all"
          onClick={() => {
            showTodos('all');
            setSelectFilter('all');
          }}
        >
          All
        </NavLink>
      </li>

      <li className="TodosFilter__items">
        <NavLink
          className={
            classNames(
              'TodosFilter__link',
              { 'TodosFilter__link--selected': selectFilter === 'active' },
            )
          }
          to="/active"
          onClick={() => {
            showTodos('active');
            setSelectFilter('active');
          }}
        >
          Active
        </NavLink>
      </li>

      <li className="TodosFilter__items">
        <NavLink
          className={
            classNames(
              'TodosFilter__link',
              { 'TodosFilter__link--selected': selectFilter === 'completed' },
            )
          }
          to="/completed"
          onClick={() => {
            showTodos('completed');
            setSelectFilter('completed');
          }}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};

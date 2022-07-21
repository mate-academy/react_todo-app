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
            classNames(`TodosFilter__link + ${selectFilter === 'all'
              ? 'TodosFilter__link--selected'
              : ''
            }`)
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
            classNames(`TodosFilter__link + ${selectFilter === 'active'
              ? 'TodosFilter__link--selected'
              : ''
            }`)
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
            classNames(`TodosFilter__link + ${selectFilter === 'completed'
              ? 'TodosFilter__link--selected'
              : ''
            }`)
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

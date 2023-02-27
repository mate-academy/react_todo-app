import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';

import { FilterType } from '../../enums/FilterType';

type Props = {
  activeTodosNum: number;
  completedTodosNum: number;
  onClearCompleted: () => void;
};

const filterOptions = Object.values(FilterType);

export const TodoFooter: React.FC<Props> = React.memo(
  ({
    activeTodosNum,
    completedTodosNum,
    onClearCompleted,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">{`${activeTodosNum} items left`}</span>

        <nav className="filter">
          {filterOptions.map((option) => (
            <NavLink
              key={option}
              to={option === FilterType.All ? '../' : `../${option}`}
              className={({ isActive }) => classNames('filter__link', {
                'filter__link--selected': isActive,
              })}
            >
              {capitalizeFirstLetter(option)}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={classNames('todoapp__clear-completed', {
            'todoapp__clear-completed--hidden': !completedTodosNum,
          })}
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

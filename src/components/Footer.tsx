import classNames from 'classnames';
import React, { useState } from 'react';
import { SearchLink } from './SearchLink';
import { Filter } from '../utils/vars';

type Props = {
  count: number,
  setFilter: (option: Filter) => void;
  clearCompleted: () => void;
  isCompleted: boolean,
};

export const Footer: React.FC<Props> = (
  {
    count,
    setFilter,
    clearCompleted,
    isCompleted,
  },
) => {
  const [isSelectedAll, setSelected] = useState(true);
  const [isSelectedActive, setSelectedActive] = useState(false);
  const [isSelectedCompleted, setSelectedCompleted] = useState(false);

  const handleAllClick = () => {
    setFilter(Filter.ALL);
    setSelected(!isSelectedAll);
    setSelectedActive(false);
    setSelectedCompleted(false);
  };

  const handleActiveClick = () => {
    setFilter(Filter.ACTIVE);
    setSelectedActive(!isSelectedActive);
    setSelected(false);
    setSelectedCompleted(false);
  };

  const handleCompletedClick = () => {
    setFilter(Filter.COMPLETED);
    setSelectedCompleted(!isSelectedCompleted);
    setSelected(false);
    setSelectedActive(false);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>
      <ul className="filters">
        <li className="filters__list">
          <SearchLink
            params={
              { status: null }
            }
            className={classNames('filters__link', { selected: isSelectedAll })}
            onClick={handleAllClick}
          >
            All
          </SearchLink>
        </li>
        <li className="filters__list">
          <SearchLink
            params={
              { status: Filter.ACTIVE }
            }
            className={classNames('filters__link',
              { selected: isSelectedActive })}
            onClick={handleActiveClick}
          >
            Active
          </SearchLink>
        </li>
        <li className="filters__list">
          <SearchLink
            params={
              { status: Filter.COMPLETED }
            }
            className={classNames('filters__link', {
              selected: isSelectedCompleted,
            })}
            onClick={handleCompletedClick}
          >
            Completed
          </SearchLink>
        </li>
      </ul>

      {
        isCompleted && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};

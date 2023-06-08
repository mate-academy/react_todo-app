import classNames from 'classnames';
import React, { useState } from 'react';
import { SearchLink } from './SearchLink';

type Props = {
  count: number,
  setFilter: (option: string) => void;
  clearCompleted: () => void;
  isCompleted: boolean,
};

enum Status {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

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
    setFilter('all');
    setSelected(!isSelectedAll);
    setSelectedActive(false);
    setSelectedCompleted(false);
  };

  const handleActiveClick = () => {
    setFilter('active');
    setSelectedActive(!isSelectedActive);
    setSelected(false);
    setSelectedCompleted(false);
  };

  const handleCompletedClick = () => {
    setFilter('completed');
    setSelectedCompleted(!isCompleted);
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
              { status: Status.ACTIVE }
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
              { status: Status.COMPLETED }
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

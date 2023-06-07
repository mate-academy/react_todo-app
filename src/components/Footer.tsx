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
  const [isSelectedAll, setSelected] = useState(false);
  const [isSelectedActive, setSelectedActive] = useState(false);
  const [isSelectedCompleted, setSelectedCompleted] = useState(false);

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
            onClick={() => {
              setFilter('all');
              setSelected(!isSelectedAll);
              setSelectedActive(false);
              setSelectedCompleted(false);
            }}
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
            onClick={() => {
              setFilter('active');
              setSelectedActive(!isSelectedActive);
              setSelected(false);
              setSelectedCompleted(false);
            }}
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
            onClick={() => {
              setFilter('completed');
              setSelectedCompleted(!isCompleted);
              setSelected(false);
              setSelectedActive(false);
            }}
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

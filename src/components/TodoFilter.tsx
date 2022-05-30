import classNames from 'classnames';
import React from 'react';

type Props = {
  sortBy: string;
  handleSortBy: (type: string) => void;
}

const TodoFilter: React.FC<Props> = ({ handleSortBy, sortBy }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={classNames({ selected: sortBy === 'all' })}
        onClick={() => {
          handleSortBy('all');
        }}
      >
        All
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames({ selected: sortBy === 'active' })}
        onClick={() => {
          handleSortBy('active');
        }}
      >
        Active
      </button>
    </li>

    <li>
      <button
        type="button"
        className={classNames({ selected: sortBy === 'completed' })}
        onClick={() => {
          handleSortBy('completed');
        }}
      >
        Completed
      </button>
    </li>
  </ul>
);

export default React.memo(TodoFilter);

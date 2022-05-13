import React from 'react';
import classNames from 'classnames';

export const TodosFilter = ({ sortParam, setSortParam }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={classNames({ selected: sortParam === 'all' })}
        onClick={() => setSortParam('all')}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classNames({ selected: sortParam === 'active' })}
        onClick={() => setSortParam('active')}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classNames({ selected: sortParam === 'completed' })}
        onClick={() => setSortParam('completed')}
      >
        Completed
      </a>
    </li>
  </ul>
);

import classNames from 'classnames';
import React from 'react';

type Props = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
};

export const TodosFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <ul
      className="filters"
      data-cy="todosFilter"
    >
      <li>
        <a
          href="#/"
          className={classNames({ selected: selectedFilter === 'all' })}
          onClick={() => setSelectedFilter('all')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={classNames({ selected: selectedFilter === 'active' })}
          onClick={() => setSelectedFilter('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={classNames({ selected: selectedFilter === 'completed' })}
          onClick={() => setSelectedFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

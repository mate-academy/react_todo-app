import React from 'react';

type Props = {
  setFilteredBy: (filterBy: string) => void;
};

enum FilterBy {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodosFilter: React.FC<Props> = ({ setFilteredBy }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => setFilteredBy('All')}
        >
          {FilterBy.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilteredBy('Active')}
        >
          {FilterBy.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilteredBy('Completed')}
        >
          {FilterBy.completed}
        </a>
      </li>
    </ul>
  );
};

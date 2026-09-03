import React from 'react';

type Filter = 'all' | 'active' | 'completed';

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'Все', testId: 'FilterLinkAll' },
    { value: 'active', label: 'Активный', testId: 'FilterLinkActive' },
    {
      value: 'completed',
      label: 'Завершенный',
      testId: 'FilterLinkCompleted',
    },
  ] as const;

  return (
    <nav className="filter" data-cy="Filter">
      {filters.map(filterName => (
        <a
          key={filterName.value}
          href={`#/${filterName.value}`}
          className={`filter__link ${
            filter === filterName.value ? 'selected' : ''
          }`}
          onClick={() => setFilter(filterName.value)}
          data-cy={filterName.testId}
        >
          {filterName.label}
        </a>
      ))}
    </nav>
  );
};

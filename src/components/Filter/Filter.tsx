import React, { useState } from 'react';
import { FilteringStatus } from '../../types/FilteringStatys';
import classNames from 'classnames';

type Props = {
  setFilteringStatus: React.Dispatch<React.SetStateAction<FilteringStatus>>;
};

enum Selected {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const filterButtons = [
  {
    title: 'All',
    href: '#/',
    'data-cy': 'FilterLinkAll',
    selected: Selected.All,
    status: FilteringStatus.All,
  },
  {
    title: 'Active',
    href: '#/active',
    'data-cy': 'FilterLinkActive',
    selected: Selected.Active,
    status: FilteringStatus.Active,
  },
  {
    title: 'Completed',
    href: '#/completed',
    'data-cy': 'FilterLinkCompleted',
    selected: Selected.Completed,
    status: FilteringStatus.Completed,
  },
];

export const Filter: React.FC<Props> = ({ setFilteringStatus }) => {
  const [selected, setSelected] = useState(Selected.All);

  return (
    <nav className="filter" data-cy="Filter">
      {filterButtons.map(button => (
        <a
          href={button.href}
          className={classNames('filter__link', {
            selected: selected === button.selected,
          })}
          data-cy={button['data-cy']}
          onClick={e => {
            e.preventDefault();
            setFilteringStatus(button.status);
            setSelected(button.selected);
          }}
          key={button.href}
        >
          {button.title}
        </a>
      ))}
    </nav>
  );
};

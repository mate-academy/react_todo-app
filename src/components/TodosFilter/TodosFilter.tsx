import React from 'react';
import { FilterBy } from '../../types/FilterBy';
import PageNavLink from '../PageNavLink';

type Props = {
  filterBy: FilterBy,
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>,
};

export const TodosFilter: React.FC<Props> = () => {
  return (
    <ul className="filters">
      <li>
        <PageNavLink to="/" text="All" />
      </li>
      <li>
        <PageNavLink to="/active" text="Active" />
      </li>
      <li>
        <PageNavLink to="/completed" text="Completed" />
      </li>
    </ul>
  );
};

import { FC } from 'react';
import { FilterNavLink } from './FilterNavLink';

export const TodosFilter: FC = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <FilterNavLink to="/" title="All" />
      </li>

      <li>
        <FilterNavLink to="/active" title="Active" />
      </li>

      <li>
        <FilterNavLink to="/completed" title="Completed" />
      </li>
    </ul>
  );
};

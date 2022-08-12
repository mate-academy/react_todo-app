import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../Utilits/SearchLink';

export const TodosFilters: React.FC = () => {
  const [searchParams] = useSearchParams();
  const completed = searchParams.get('completed');

  return (
    <ul className="filters">
      <li>
        <SearchLink
          params={{ completed: null }}
          className={classNames({ selected: !completed })}
        >
          All
        </SearchLink>
      </li>

      <li>
        <SearchLink
          params={{ completed: 'active' }}
          className={classNames({ selected: completed === 'active' })}
        >
          Active
        </SearchLink>
      </li>

      <li>
        <SearchLink
          params={{ completed: 'completed' }}
          className={classNames({ selected: completed === 'completed' })}
        >
          Completed
        </SearchLink>
      </li>
    </ul>
  );
};

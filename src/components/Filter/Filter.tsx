import React, { useContext } from 'react';
import cn from 'classnames';

import { FilterContext } from '../FilterProvider/FilterProvider';
import { TodoFilter } from '../../types/TodoFilter';

type Props = {};

export const Filter: React.FC<Props> = ({}) => {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(TodoFilter).map(link => {
        const upperCaseName = link[0].toUpperCase() + link.slice(1);

        return (
          <a
            href={`#/${link === 'all' ? '' : link}`}
            className={cn('filter__link', {
              selected: filter === link,
            })}
            data-cy={`FilterLink${upperCaseName}`}
            key={link}
            onClick={() => setFilter(link)}
          >
            {upperCaseName}
          </a>
        );
      })}
    </nav>
  );
};

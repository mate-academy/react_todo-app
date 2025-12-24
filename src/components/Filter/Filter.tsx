import React, { useContext } from 'react';
import { FilterType } from '../../types/FilterType';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

export const Filter: React.FC = () => {
  const { filterBy, setFilterBy } = useContext(TodoContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(FilterType).map(type => {
        const firstUpperType = type.charAt(0).toUpperCase() + type.slice(1);

        return (
          <a
            key={type}
            href={`#/${type === FilterType.All ? '' : type}`}
            className={classNames('filter__link', {
              selected: filterBy === type,
            })}
            data-cy={`FilterLink${firstUpperType}`}
            onClick={event => {
              event.preventDefault();
              setFilterBy(type);
            }}
          >
            {firstUpperType}
          </a>
        );
      })}
    </nav>
  );
};

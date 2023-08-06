import React from 'react';
import classNames from 'classnames';
import { Filters } from '../../types/enumFilter';

type Props = {
  filteringField: Filters;
  setFilteringField: (str: Filters) => void;
};

export const Filter: React.FC<Props> = ({
  filteringField,
  setFilteringField,
}) => {
  const filterValues = Object.values(Filters);

  return (
    <ul className="filters">
      {
        filterValues.map(field => (
          <li key={field}>
            <a
              href={field === 'all' ? '#/' : `#/${field}`}
              className={classNames('filter__link', {
                selected: field === filteringField,
              })}
              onClick={() => {
                setFilteringField(field);
              }}
            >
              {field[0].toUpperCase() + field.slice(1)}
            </a>
          </li>
        ))
      }
    </ul>
  );
};

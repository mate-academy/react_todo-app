import React from 'react';
import classNames from 'classnames';
import { Filters } from '../../types/enumFilter';

type FilterProps = {
  filterField: Filters;
  setfilterField: (str: Filters) => void;
};

export const Filter: React.FC<FilterProps> = ({
  filterField,
  setfilterField,
}) => {
  const filterValue = Object.values(Filters);

  return (
    <ul className="filters">
      {
        filterValue.map(field => (
          <li key={field}>
            <a
              href={field === 'all' ? '#/' : `#/${field}`}
              className={classNames('filter__link', {
                selected: field === filterField,
              })}
              onClick={() => {
                setfilterField(field);
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

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Status, LinkHref } from '../../types/FilterTypes';

const filterLinks = [
  { name: Status.ALL, way: LinkHref.ALL },
  { name: Status.ACTIVE, way: LinkHref.ACTIVE },
  { name: Status.COMPLETED, way: LinkHref.COMPLETED },
];

type TodosFilterProps = {
  selectedFilter: Status;
  setSelectedFilter: (filter: Status) => void,
};

export const TodosFilter: React.FC<TodosFilterProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <ul className="filters">
      {filterLinks.map(link => {
        const { name, way } = link;

        return (
          <li
            key={name}
          >
            <Link
              to={`../${way}`}
              className={classNames({ selected: selectedFilter === name })}
              onClick={() => setSelectedFilter(name)}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

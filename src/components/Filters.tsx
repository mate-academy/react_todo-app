import React from 'react';

export type InFILTERS = {
  all: string;
  active: string;
  completed: string;
};

type InFilterData = {
  filter: string;
  FILTERS: InFILTERS;
  setFilter: (x: string) => void;
};

export function Filters({
  filter,
  FILTERS,
  setFilter,
}: InFilterData) {
  return (
    <ul className="filters">
      {Object.keys(FILTERS).map((elem: string) => (
        <li key={elem}>
          <a
            href="#/"
            className={`${filter === elem ? 'selected' : null}`}
            onClick={() => setFilter(elem)}
          >
            {elem[0].toUpperCase() + elem.slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
}

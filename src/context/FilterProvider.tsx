import React, { createContext, useState } from 'react';

export enum Filter {
  All,
  Completed,
  Active,
}

export const FilterContext = createContext({
  filter: Filter.All,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFilter: (_filter: Filter) => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState(Filter.All);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

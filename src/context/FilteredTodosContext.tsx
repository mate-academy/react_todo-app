import React, { createContext, useContext, useState } from 'react';

type Filter = 'all' | 'active' | 'completed';

const FilterContext = createContext<{
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}>({ filter: 'all', setFilter: () => null });

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

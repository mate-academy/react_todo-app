import { createContext, useContext, useState } from 'react';
import { FilterType } from '../types/Filter';

type FilterContextType = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const FilterContext = createContext<FilterContextType>({
  filter: FilterType.All,
  setFilter: () => {},
});

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

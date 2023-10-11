import { useState, createContext, useMemo } from 'react';
import { Status } from '../interface/Status';

export const FilterContext = createContext<{
  selectedFilter: Status;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Status>>;
}>({
  selectedFilter: Status.All,
  setSelectedFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.All);

  const value = useMemo(() => ({
    selectedFilter,
    setSelectedFilter,
  }), [selectedFilter]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

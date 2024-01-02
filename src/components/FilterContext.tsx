import React, { useState } from 'react';

export const FilterContext = React.createContext({
  filter: {
    all: true,
    active: false,
    completed: false,
  },
  setFilter: {} as React.Dispatch<React.SetStateAction<{ all:boolean,
    active: boolean,
    completed: boolean, }>>,
});
type Props = {
  children:React.ReactNode
};

export const TodoFiltersProvider : React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState({
    all: true,
    active: false,
    completed: false,
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

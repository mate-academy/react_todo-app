/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';

import { TodoFilter } from '../../types/TodoFilter';

type Props = {
  children: React.ReactNode;
};

const initialFilter = TodoFilter.all;

export const FilterContext = React.createContext({
  filter: initialFilter,
  setFilter: (_f: TodoFilter) => {},
});

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState(initialFilter);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

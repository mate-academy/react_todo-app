import React, { useMemo, useState } from 'react';

import { ContextProvider } from '../types/ContextProvider';
import { TodosFilterQuery } from '../constants';

interface QueryContextType {
  query: TodosFilterQuery;
  setQuery: React.Dispatch<React.SetStateAction<TodosFilterQuery>>;
}

export const QueryContext = React.createContext<QueryContextType>({
  query: TodosFilterQuery.all,
  setQuery: () => {},
});

export const QueryProvider: React.FC<ContextProvider> = ({ children }) => {
  const [query, setQuery] = useState(TodosFilterQuery.all);

  const value: QueryContextType = useMemo(() => ({
    query,
    setQuery,
  }), [query]);

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
};

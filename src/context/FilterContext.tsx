import { createContext, useContext, useState } from "react";
import { FilterType, TodosFilterContextType } from "../types/todoTypes";

const FilterContext = createContext<TodosFilterContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All
  );

  return (
    <FilterContext.Provider value={{ currentFilter, setCurrentFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used with a context");
  }
  return context;
};

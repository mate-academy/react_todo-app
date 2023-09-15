export enum FilterType {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export type TodosFilterContextType = {
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
};

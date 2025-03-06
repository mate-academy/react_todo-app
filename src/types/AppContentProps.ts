import { FilterType } from "./FilterType";

export type AppContentProps = {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
};

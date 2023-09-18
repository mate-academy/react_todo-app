/* eslint-disable */
import React from "react";
import { useFilterContext } from "../context/FilterContext";
import { FilterType } from "../types/todoTypes";

export const TodosFilter: React.FC = () => {
  const { currentFilter, setCurrentFilter } = useFilterContext(); // Używamy hooka do kontekstu filtrów

  const handleFilterChange = (status: FilterType) => {
    setCurrentFilter(status);
  };

  const filters = [
    { label: "All", type: FilterType.All },
    { label: "Active", type: FilterType.Active },
    { label: "Completed", type: FilterType.Completed },
  ];

  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter.type}>
          <a
            href={`#/${filter.type}`}
            className={currentFilter === filter.type ? "selected" : ""}
            onClick={() => handleFilterChange(filter.type)}
          >
            {filter.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

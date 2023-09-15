import React from "react";
import { useFilterContext } from "../context/FilterContext";
import { FilterType } from "../types/todoTypes";

export const TodosFilter: React.FC = () => {
  const { currentFilter, setCurrentFilter } = useFilterContext(); // Używamy hooka do kontekstu filtrów

  const handleFilterChange = (status: FilterType) => {
    setCurrentFilter(status);
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={currentFilter === FilterType.All ? "selected" : ""}
          onClick={() => handleFilterChange(FilterType.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={currentFilter === FilterType.Active ? "selected" : ""}
          onClick={() => handleFilterChange(FilterType.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={currentFilter === FilterType.Completed ? "selected" : ""}
          onClick={() => handleFilterChange(FilterType.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

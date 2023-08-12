import React, { useContext } from "react";
import { Filter } from "../types/Filter";
import { TodosContext } from "./TodosContext";

export const TodosFilter: React.FC = () => {
  const { filterType, setFilterType } = useContext(TodosContext);

  const makeSetFilterType = (type: Filter) => (
    () => setFilterType(type)
  );

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterType === Filter.ALL ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterType === Filter.ACTIVE ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterType === Filter.COMPLETED ? 'selected' : ''}
          onClick={makeSetFilterType(Filter.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

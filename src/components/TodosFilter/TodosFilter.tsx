/*eslint-disable*/
import React, { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";

import { FILTERS } from "../../types/filterEnum";
import classNames from "classnames";

export const TodosFilter: React.FC = () => {
  const { onChangeFilter, filterField } = useContext(TodosContext);

  return (
    <ul className="filters">
      <li onClick={() => onChangeFilter(FILTERS.ALL)}>
        <a
          href="#/"
          className={classNames({
            selected: filterField === FILTERS.ALL,
          })}
        >
          All
        </a>
      </li>

      <li onClick={() => onChangeFilter(FILTERS.ACTIVE)}>
        <a
          className={classNames({
            selected: filterField === FILTERS.ACTIVE,
          })}
          href="#/active"
        >
          Active
        </a>
      </li>

      <li onClick={() => onChangeFilter(FILTERS.COMPLETED)}>
        <a
          className={classNames({
            selected: filterField === FILTERS.COMPLETED,
          })}
          href="#/completed"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

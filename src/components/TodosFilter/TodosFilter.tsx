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

      <li>
        <a
          className={classNames({
            selected: filterField === FILTERS.ACTIVE,
          })}
          onClick={(e) => {
            e.preventDefault();
            onChangeFilter(FILTERS.ACTIVE);
          }}
          href="#/active"
        >
          Active
        </a>
      </li>

      <li>
        <a
          onClick={(e) => {
            e.preventDefault();
            onChangeFilter(FILTERS.COMPLETED);
          }}
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

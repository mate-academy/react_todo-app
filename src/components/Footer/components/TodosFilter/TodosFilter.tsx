//import { useContext, useState } from "react"
import { Status } from '../../../../types/Status';
import { FilterItem } from '../FiterItem/FilterItem';

export const TodosFilter = () => {
  return (
    <ul className="filters" data-cy="todosFilter">
      <FilterItem currentFilter={Status.all} />
      <FilterItem currentFilter={Status.active} />
      <FilterItem currentFilter={Status.completed} />
    </ul>
  );
};

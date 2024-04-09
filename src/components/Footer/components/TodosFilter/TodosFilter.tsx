//import { useContext, useState } from "react"
import { Status } from '../../../../types/Status';
import { FilterItem } from '../FiterItem/FilterItem';

export const TodosFilter = () => {
  return (
    <nav className="filter" data-cy="Filter">
      <FilterItem currentFilter={Status.all} check="FilterLinkAll" />
      <FilterItem currentFilter={Status.active} check="FilterLinkActive" />
      <FilterItem
        currentFilter={Status.completed}
        check="FilterLinkCompleted"
      />
    </nav>
  );
};

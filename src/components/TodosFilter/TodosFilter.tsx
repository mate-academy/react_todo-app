import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../store/TodoProvider';
import { ActionType, FilterType } from '../../types/Todo';

export const TodosFilter: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const setFilterType = (filterBy: FilterType) => {
    dispatch({ type: ActionType.FILTER, payload: filterBy });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={cn({
            selected: state.filterBy === FilterType.ALL,
          })}
          onClick={() => setFilterType(FilterType.ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({
            selected: state.filterBy === FilterType.ACTIVE,
          })}
          onClick={() => setFilterType(FilterType.ACTIVE)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({
            selected: state.filterBy === FilterType.COMPLETED,
          })}
          onClick={() => setFilterType(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

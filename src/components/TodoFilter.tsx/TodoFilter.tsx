import React, { Dispatch, useContext } from 'react';
import { TodosContext } from '../../store/TodoContext';
import { State, Action, Filter } from '../../types/Context';

export const TodoFilter: React.FC = () => {
  const [{ filter }, dispatch]
  = useContext(TodosContext) as [State, Dispatch<Action>];

  const getSelectedClass = (filterName: string) => {
    return filter === filterName ? 'selected' : '';
  };

  const changeFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filterName: Filter,
  ) => {
    event.preventDefault();
    dispatch({ type: 'CHANGE_FILTER', payload: filterName });
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={getSelectedClass('ALL')}
          onClick={(event) => changeFilter(event, 'ALL')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={getSelectedClass('ACTIVE')}
          onClick={(event) => changeFilter(event, 'ACTIVE')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={getSelectedClass('COMPLETED')}
          onClick={(event) => changeFilter(event, 'COMPLETED')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

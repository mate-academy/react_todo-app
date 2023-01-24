import classNames from 'classnames';
import React, { useMemo } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

interface Props {
  setFilterType: (filterType: FilterType) => void,
  filterType: FilterType,
  clearAllHandler: () => void,
  visibleTodos: Todo[],
}

export const FilterTodoList: React.FC<Props> = ({
  setFilterType,
  filterType,
  clearAllHandler,
  visibleTodos,
}) => {
  const isClearButtondisabled = visibleTodos
    .some(todo => todo.completed === true);

  const countCompletedTodos = useMemo(
    () => visibleTodos
      .filter(todo => todo.completed === false).length, [visibleTodos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countCompletedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: FilterType.All === filterType },
          )}
          onClick={() => setFilterType(FilterType.All)}
        >
          {FilterType.All}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: FilterType.Active === filterType },
          )}
          onClick={() => setFilterType(FilterType.Active)}
        >
          {FilterType.Active}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: FilterType.Completed === filterType },
          )}
          onClick={() => setFilterType(FilterType.Completed)}
        >
          {FilterType.Completed}
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: isClearButtondisabled ? 'visible' : 'hidden' }}
        onClick={clearAllHandler}
      >
        Clear completed
      </button>
    </footer>
  );
};

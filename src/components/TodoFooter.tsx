import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';

import { FilterBy } from '../types/FilterBy';
import { ActionType } from '../types/Action';
import { DispatchContext, StateContext } from '../states/TodosContext';

interface Props {
  selectedFilter: FilterBy,
  onFilterSelected: (value: FilterBy) => void,
}

export const TodoFooter: React.FC<Props> = React.memo(({
  selectedFilter,
  onFilterSelected,
}) => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const isCompletedExists = useMemo(
    () => todos.some((todo) => todo.completed),
    [todos],
  );

  const getActiveCount = useCallback(() => {
    return todos.reduce((acc, todo) => {
      return !todo.completed ? acc + 1 : acc;
    }, 0);
  }, [todos]);

  const clearCompleted = () => {
    const completedIds = todos.reduce((acc, todo) => {
      return todo.completed ? [...acc, todo.id] : acc;
    }, [] as number[]);

    completedIds.forEach((todoId) => {
      dispatch({ type: ActionType.Remove, payload: { id: todoId } });
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getActiveCount()} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: selectedFilter === FilterBy.All,
            })}
            onClick={() => onFilterSelected(FilterBy.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: selectedFilter === FilterBy.Active,
            })}
            onClick={() => onFilterSelected(FilterBy.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: selectedFilter === FilterBy.Completed,
            })}
            onClick={() => onFilterSelected(FilterBy.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {isCompletedExists && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});

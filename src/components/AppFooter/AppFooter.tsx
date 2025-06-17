import cn from 'classnames';
import React, { useMemo } from 'react';
import { FilterParams } from '../../types/types';
import { ActionType, useDispatch, useGlobalState } from '../../globalProvider';

interface Props {
  filter: FilterParams;
  setFilter: (value: FilterParams) => void;
}

const filterOptions = [
  { value: FilterParams.All, label: 'All' },
  { value: FilterParams.Active, label: 'Active' },
  { value: FilterParams.Completed, label: 'Completed' },
];

export const AppFooter: React.FC<Props> = ({ filter, setFilter }) => {
  const dispatch = useDispatch();
  const todos = useGlobalState();

  const { activeTodos, isCompletedTodos } = useMemo(() => {
    const active = todos.filter(todo => !todo.completed).length;
    const hasCompleted = todos.some(todo => todo.completed);

    return {
      activeTodos: active,
      isCompletedTodos: hasCompleted,
    };
  }, [todos]);

  const handleDeleteCompleted = () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    dispatch({ type: ActionType.DeleteCompleted, payload: completedIds });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(option => {
          const { value, label } = option;

          return (
            <a
              key={value}
              href="#/"
              className={cn('filter__link', {
                selected: filter === value,
              })}
              data-cy={`FilterLink${label}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedTodos}
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

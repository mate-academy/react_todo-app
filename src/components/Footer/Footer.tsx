import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { useTodos } from '../Сontext/TodosContext';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  onClearCompleted: () => void;
};

const FILTER_LABELS: Record<Filter, string> = {
  [Filter.All]: 'All',
  [Filter.Active]: 'Active',
  [Filter.Completed]: 'Completed',
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  onClearCompleted,
}) => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  const todosLeft = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(option => (
          <a
            key={option}
            href={`#/${option === Filter.All ? '' : option}`}
            className={classNames('filter__link', {
              selected: filter === option,
            })}
            data-cy={`FilterLink${FILTER_LABELS[option]}`}
            onClick={e => {
              e.preventDefault();
              setFilter(option);
            }}
          >
            {FILTER_LABELS[option]}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React from 'react';
import { FilterOption } from '../../../types/FilterOptions';
import classNames from 'classnames';
import { useTodos, useTodoDispatch } from '../../../context/todoContext';

type Props = {
  filterBy: FilterOption;
  onFilterChange: (newValue: FilterOption) => void;
};

const filterOptions = [
  { type: FilterOption.ALL, label: 'All', href: '#/' },
  { type: FilterOption.ACTIVE, label: 'Active', href: '#/active' },
  { type: FilterOption.COMPLETED, label: 'Completed', href: '#/completed' },
];

export const TodoFooter: React.FC<Props> = React.memo(
  ({ filterBy, onFilterChange }) => {
    const todos = useTodos();
    const { deleteCompleted } = useTodoDispatch();

    const itemsLeftCount = todos.filter(todo => !todo.completed).length;
    const completedItemsCount = todos.length - itemsLeftCount;

    if (!todos.length) {
      return null;
    }

    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemsLeftCount} item{itemsLeftCount !== 1 ? 's' : ''} left
        </span>

        <nav className="filter" data-cy="Filter">
          {filterOptions.map(({ type, label, href }) => (
            <a
              key={type}
              href={href}
              className={classNames('filter__link', {
                selected: filterBy === type,
              })}
              data-cy={`FilterLink${label}`}
              onClick={() => onFilterChange(type)}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completedItemsCount === 0}
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

TodoFooter.displayName = 'TodoFooter';

import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const {
    value: { todos },
    filter: { statusFilter, setStatusFilter },
    onClearCompleted,
    completedCount,
  } = useContext(TodosContext)!;

  const notCompletedTodos = todos.filter(
    (todo: { completed: unknown }) => !todo.completed,
  );

  const filterLinks = Object.values(Filter).map(filter => {
    return {
      name: filter.charAt(0).toUpperCase() + filter.slice(1),
      href: filter === Filter.All ? '#/' : `#/${filter}`,
      dataCy: `FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`,
      value: filter,
    };
  });

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ name, href, dataCy, value }) => (
          <a
            key={value}
            href={href}
            className={classNames('filter__link', {
              selected: statusFilter === value,
            })}
            data-cy={dataCy}
            onClick={() => setStatusFilter(value)}
          >
            {name}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

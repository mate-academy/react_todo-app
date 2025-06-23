import React from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';
import classNames from 'classnames';
import { FilterTodos } from '../../types/FilterTodos';

const FILTER_TITLES: Record<FilterTodos, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export const Footer: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodoContext();

  const countActiveTodos = todos.filter(todo => !todo.completed).length;
  const countCompletedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countActiveTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTodos).map(type => (
          <a
            key={type}
            href={`#/${type === FilterTodos.All ? '' : type}`}
            className={classNames('filter__link', {
              selected: filter === type,
            })}
            data-cy={`FilterLink${type.charAt(0).toUpperCase() + type.slice(1)}`}
            onClick={() => setFilter(type)}
          >
            {FILTER_TITLES[type]}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={countCompletedTodos === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

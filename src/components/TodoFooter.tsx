import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { Filter } from '../types/types';
import { pluralize, capitalize } from '../utils/helpers';

const FILTER_TYPES: Filter[] = ['all', 'active', 'completed'];

export const TodoFooter: React.FC = () => {
  const { state, dispatch } = useTodoContext();
  const { todos, filter } = state;

  if (todos.length === 0) {
    return null;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleFilterChange =
    (newFilter: Filter) => (event: React.MouseEvent) => {
      event.preventDefault();

      if (filter !== newFilter) {
        dispatch({ type: 'SET_FILTER', payload: { filter: newFilter } });
      }
    };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} item{pluralize(activeTodosCount)} left
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTER_TYPES.map(filterType => {
          const isSelected = filter === filterType;
          const href = `#/${filterType === 'all' ? '' : filterType}`;
          const dataCyAttribute = `FilterLink${capitalize(filterType)}`;

          return (
            <a
              key={filterType}
              href={href}
              className={`filter__link ${isSelected ? 'selected' : ''}`}
              data-cy={dataCyAttribute}
              onClick={handleFilterChange(filterType)}
            >
              {capitalize(filterType)}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

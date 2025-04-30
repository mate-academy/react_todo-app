import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { TodoContext } from '../../context/TodoContext';
import cn from 'classnames';
import { FilterSelectEnum } from '../../types/FilterSelectEnum';

export const Footer: React.FC = React.memo(() => {
  const { setTodos, generalTodos, setGeneralTodos } = useContext(TodoContext);
  const [selectedFilter, setSelectedFilter] = React.useState<FilterSelectEnum>(
    FilterSelectEnum.All,
  );
  const completedTodos = generalTodos.filter(todo => todo.completed);
  const hasCompletedTodos = completedTodos.length > 0;
  const completedTodosCount = completedTodos.length;

  const filterSelect: FilterSelectEnum[] = useMemo(
    () => [
      FilterSelectEnum.All,
      FilterSelectEnum.Active,
      FilterSelectEnum.Completed,
    ],
    [],
  );

  const clearCompleted = useCallback(() => {
    setGeneralTodos(generalTodos.filter(todo => !todo.completed));
  }, [generalTodos, setGeneralTodos]);

  useEffect(() => {
    switch (selectedFilter) {
      case FilterSelectEnum.All:
        setTodos(generalTodos);
        break;
      case FilterSelectEnum.Active:
        setTodos(generalTodos.filter(todo => !todo.completed));
        break;
      case FilterSelectEnum.Completed:
        setTodos(generalTodos.filter(todo => todo.completed));
        break;
      default:
        setTodos(generalTodos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalTodos, selectedFilter]);

  if (generalTodos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${generalTodos.length - completedTodosCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterSelect.map(filter => (
          <a
            key={filter}
            href={`#/${FilterSelectEnum[filter].toLowerCase()}`}
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${FilterSelectEnum[filter]}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {FilterSelectEnum[filter]}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
});

Footer.displayName = 'Footer';

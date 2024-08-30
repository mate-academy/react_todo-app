import { useTodosContext } from '../../context/TodosContext';
import { FilterTypes } from '../../enums/FilterTypes';
import classNames from 'classnames';
import { useState } from 'react';

export const TodoFilter = () => {
  const { todos, setFilter, handleDelete, completedTodos } = useTodosContext();
  const [filterValue, setFilterValue] = useState<FilterTypes>(FilterTypes.All);

  const notCompletedTodos = todos.filter(todo => !todo.completed);

  const setFilters = (filter: FilterTypes) => {
    setFilterValue(filter);
    setFilter(filter);
  };

  const deleteAllCompletedTodos = () => {
    for (const todo of completedTodos) {
      handleDelete(todo.id);
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(FilterTypes).map(filterType => {
          const href =
            filterType === FilterTypes.All
              ? '#/'
              : `#/${filterType.toLowerCase()}`;

          return (
            <a
              key={filterType}
              href={href}
              className={classNames('filter__link', {
                selected: filterValue === filterType,
              })}
              data-cy={`FilterLink${filterType}`}
              onClick={() => setFilters(filterType as FilterTypes)}
            >
              {filterType}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
        onClick={deleteAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

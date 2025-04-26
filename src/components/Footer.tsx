import React, { useMemo } from 'react';
import { Filter } from '../type/Filter';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

type FooterProps = {
  unCompletedTodos: number;
  filteredBy: Filter;
  setFilteredBy: React.Dispatch<React.SetStateAction<Filter>>;
};

export const Footer: React.FC<FooterProps> = ({
  unCompletedTodos,
  filteredBy,
  setFilteredBy,
}) => {
  const { todos, setTodos } = useTodos();

  const completedTodosLength = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {unCompletedTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map((filter: Filter) => {
          return (
            <a
              href={`#/${filter === Filter.All ? '' : filter.toLowerCase()}`}
              key={filter}
              className={classNames('filter__link', {
                selected: filteredBy === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => setFilteredBy(filter)}
            >
              {filter}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodosLength === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

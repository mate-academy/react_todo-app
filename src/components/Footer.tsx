import { useEffect, useState } from 'react';
import { filters } from '../constants/filters';
import { useTodos } from '../hooks/useTodos';
import { filterTodos } from '../helpers/filterTodos';
import { FilterBy } from '../types/FilterBy';

export const Footer = () => {
  const { filterBy, setFilterBy, todos, setTodos, activeTodosAmount } =
    useTodos();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const hasCompletedTodos = todos.filter(t => t.completed).length !== 0;

    setIsButtonDisabled(!hasCompletedTodos);
  }, [todos]);

  const clearCompleted = () => {
    setTodos(prev => filterTodos(prev, FilterBy.Active));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosAmount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ label, value, cy, href }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${filterBy === value ? 'selected' : ''}`}
            data-cy={cy}
            onClick={e => {
              e.preventDefault();
              setFilterBy(value);
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted()}
        disabled={isButtonDisabled}
      >
        Clear completed
      </button>
    </footer>
  );
};

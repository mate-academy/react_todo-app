import React from 'react';
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
  const { setTodos } = useTodos();

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {unCompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filteredBy === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilteredBy(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filteredBy === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilteredBy(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filteredBy === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilteredBy(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { FilterType, Filter } from '../types/Filter';
import classNames from 'classnames';

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFooter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, clearCompleted, newTodoInputRef } = useContext(TodoContext);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            onFilterChange(Filter.ALL);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            onFilterChange(Filter.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            onFilterChange(Filter.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={() => {
          clearCompleted();
          newTodoInputRef.current?.focus();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

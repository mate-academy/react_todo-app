import React, { useContext, useMemo } from 'react';
import { FilterOption } from '../types/FIlterOption';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

interface FooterProps {
  filter: FilterOption;
  onFilter: (option: FilterOption) => void;
}

export const Footer: React.FC<FooterProps> = ({ filter, onFilter }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const activeCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const completedCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  if (todos.length === 0) {
    return null;
  }

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'All',
            })}
            data-cy="FilterLinkAll"
            onClick={() => onFilter('All')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'Active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => onFilter('Active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'Completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => onFilter('Completed')}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};

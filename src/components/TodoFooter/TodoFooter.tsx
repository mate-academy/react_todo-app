import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import classNames from 'classnames';
import { TodosFilters } from '../../types/TodosFilters';
import { TodosFiltersContext } from '../../contexts/TodosFiltersContext';
import { FocusContext } from '../../contexts/FocusContext';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { todosFilter, setTodosFilter } = useContext(TodosFiltersContext);
  const { handleFocus } = React.useContext(FocusContext);
  const [isCompletedExist, setIsCompletedExist] = useState(
    todos.some(todo => todo.completed),
  );
  const [todosCount, setTodosCount] = useState(
    todos.filter(todo => !todo.completed).length,
  );

  const setFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filter: TodosFilters,
  ) => {
    event.preventDefault();
    setTodosFilter(filter);
  };

  useEffect(() => {
    setIsCompletedExist(todos.some(todo => todo.completed));
    setTodosCount(todos.filter(todo => !todo.completed).length);
  }, [todos]);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    handleFocus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount} items left
      </span>
      {/* Hide the footer if there are no todos */}

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: todosFilter === TodosFilters.All,
          })}
          data-cy="FilterLinkAll"
          onClick={event => setFilter(event, TodosFilters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: todosFilter === TodosFilters.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={event => setFilter(event, TodosFilters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: todosFilter === TodosFilters.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={event => setFilter(event, TodosFilters.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedExist}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

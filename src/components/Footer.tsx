import React, { useContext } from 'react';
import { CreatedContext } from './ToDoContext';
import { FilterButtons } from '../types/FilterType';
import '../styles/todo.scss';
import '../styles/todoapp.scss';
import '../styles/filter.scss';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setFilterButton, setTodos, filterButton } =
    useContext(CreatedContext);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const handleCounter = `${activeTodos.length} items left`;

  const handleClearButton = () => {
    const updateTodos = todos.filter(todo => !todo.completed);

    setTodos(updateTodos);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {handleCounter}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterButton === FilterButtons.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => setFilterButton(FilterButtons.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterButton === FilterButtons.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => setFilterButton(FilterButtons.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterButton === FilterButtons.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilterButton(FilterButtons.Completed)}
            >
              Completed
            </a>
          </nav>
          <button
            type="button"
            className={classNames('todoapp__clear-completed', {
              'todoapp__clear-completed--hidden': completedTodos.length === 0,
            })}
            data-cy="ClearCompletedButton"
            onClick={() => handleClearButton()}
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

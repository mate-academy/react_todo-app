import React, { useContext } from 'react';
import { Dispatch, StateContext } from './ToDoContext';
import { FilterButtons } from '../types/FilterType';
import '../styles/todo.scss';
import '../styles/todoapp.scss';
import '../styles/filter.scss';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filterButton } = useContext(StateContext);
  const dispatch = useContext(Dispatch);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const handleCounter = `${activeTodos.length} items left`;

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
              onClick={() => {
                dispatch({
                  type: 'SET FILTER',
                  filter: FilterButtons.All,
                });
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filterButton === FilterButtons.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => {
                dispatch({
                  type: 'SET FILTER',
                  filter: FilterButtons.Active,
                });
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filterButton === FilterButtons.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => {
                dispatch({
                  type: 'SET FILTER',
                  filter: FilterButtons.Completed,
                });
              }}
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
            onClick={() => {
              dispatch({
                type: 'CLEAR COMPLETED',
              });
            }}
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

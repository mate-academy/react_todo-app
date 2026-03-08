import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  sortBy: string;
  setSortBy: (value: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  sortBy,
  setSortBy,
  deleteTodo,
}) => {
  const completedTodos: Todo[] = todos.filter(todo => todo.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              // className="filter__link selected"
              className={
                sortBy === 'all' ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkAll"
              onClick={() => {
                setSortBy('all');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={
                sortBy === 'active' ? 'filter__link selected' : 'filter__link'
              }
              data-cy="FilterLinkActive"
              onClick={() => {
                setSortBy('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={
                sortBy === 'completed'
                  ? 'filter__link selected'
                  : 'filter__link'
              }
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setSortBy('completed');
              }}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={completedTodos.length === 0}
            onClick={() => {
              completedTodos.forEach(t => {
                deleteTodo(t);
              });
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

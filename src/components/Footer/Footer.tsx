import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';
import { useTodosContext } from '../../contexts/TodosContext';

type Props = {
  filter: Filter;
  setFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos, actions, headerInputRef } = useTodosContext();

  const todosCounter = todos.filter(todo => !todo.completed).length;

  return (
    !!todos.length && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todosCounter} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'all',
            })}
            data-cy="FilterLinkAll"
            onClick={() => setFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => setFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={todos.every(todo => !todo.completed)}
          onClick={() => {
            actions.clearCompleted();
            headerInputRef.current?.focus();
          }}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};

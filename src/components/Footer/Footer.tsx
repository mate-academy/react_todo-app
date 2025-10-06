import React from 'react';
import { Filter } from '../../types/Filter';
import classNames from 'classnames';
import { useTodosContext } from '../../contexts/TodosContext';
import { useDeleteContext } from '../../contexts/DeleteContext';

type Props = {
  filter: Filter;
  stateFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = ({ filter, stateFilter }) => {
  const { todos } = useTodosContext();
  const { handleDelete } = useDeleteContext();

  const todosCounter = todos.filter(
    todo => !todo.completed && !todo.isLoading,
  ).length;

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
            onClick={() => stateFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={() => stateFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => stateFilter('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={todos.every(todo => !todo.completed)}
          onClick={() =>
            todos.forEach(todo => todo.completed && handleDelete(todo.id))
          }
        >
          Clear completed
        </button>
      </footer>
    )
  );
};

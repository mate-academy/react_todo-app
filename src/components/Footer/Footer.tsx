import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

type Props = {
  setFilter: (value: FilterType) => void
  filter: FilterType
  todos: Todo[]
  removeTodo: (todoId: number) => void
};

export const Footer: React.FC<Props> = ({
  setFilter,
  filter,
  todos,
  removeTodo,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const currentTodos = todos.length - completedTodos.length;

  const removeCompletedTodos = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        removeTodo(todo.id);
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${currentTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            'filter__link selected': filter === FilterType.ALL,
          })}
          onClick={() => {
            setFilter(FilterType.ALL);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filter === FilterType.ACTIVE,
          })}
          onClick={() => {
            setFilter(FilterType.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filter === FilterType.COMPLETED,
          })}
          onClick={() => {
            setFilter(FilterType.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className={classNames('todoapp__clear-completed', {
          'has-text-white': !completedTodos.length,
        })}
        onClick={removeCompletedTodos}
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};

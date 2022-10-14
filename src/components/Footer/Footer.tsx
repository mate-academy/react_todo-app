import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<string>>
  filter: string
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
        {todos.length - completedTodos.length}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            'filter__link selected': filter === 'all',
          })}
          onClick={(event) => {
            setFilter(event.currentTarget.innerHTML.toLocaleLowerCase());
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filter === 'active',
          })}
          onClick={(event) => {
            setFilter(event.currentTarget.innerHTML.toLocaleLowerCase());
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filter === 'completed',
          })}
          onClick={(event) => {
            setFilter(event.currentTarget.innerHTML.toLocaleLowerCase());
          }}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={removeCompletedTodos}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};

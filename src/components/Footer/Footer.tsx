import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterTodos: string,
  setFilterTodos: (filter: string) => void,
  removeTodo: (todoId: number) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterTodos,
  setFilterTodos,
  removeTodo,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);

  const removeCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        removeTodo(todo.id);
      }
    });
  };

  const optionSelected = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setFilterTodos(event.currentTarget.innerHTML.toLocaleLowerCase());
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
            'filter__link selected': filterTodos === 'all',
          })}
          onClick={optionSelected}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filterTodos === 'active',
          })}
          onClick={optionSelected}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filterTodos === 'completed',
          })}
          onClick={optionSelected}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

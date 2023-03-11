import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Status } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: Status,
  setFilter: (filter: Status) => void,
  onTodoDelete:(todoId: number) => void,
  completedTodos: Todo[],
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  onTodoDelete,
  completedTodos,
}) => {
  const onRemoveCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        onTodoDelete(todo.id);
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
        <NavLink
          data-cy="FilterLinkAll"
          to="/"
          className={classNames('filter__link', {
            selected: filter === Status.All,
          })}
          onClick={() => {
            setFilter(Status.All);
          }}
        >
          All
        </NavLink>

        <NavLink
          data-cy="FilterLinkActive"
          to="/active"
          className={classNames('filter__link', {
            selected: filter === Status.Active,
          })}
          onClick={() => {
            setFilter(Status.Active);
          }}
        >
          Active
        </NavLink>
        <NavLink
          data-cy="FilterLinkCompleted"
          to="/completed"
          className={classNames('filter__link', {
            selected: filter === Status.Completed,
          })}
          onClick={() => {
            setFilter(Status.Completed);
          }}
        >
          Completed
        </NavLink>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={onRemoveCompleted}
        style={{
          visibility: completedTodos.length
            ? 'visible'
            : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

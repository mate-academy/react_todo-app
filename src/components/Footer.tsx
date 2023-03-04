import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: FilterType,
  setFilter: (filter: FilterType) => void,
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
            selected: filter === FilterType.All,
          })}
          onClick={() => {
            setFilter(FilterType.All);
          }}
        >
          All
        </NavLink>

        <NavLink
          data-cy="FilterLinkActive"
          to="/active"
          className={classNames('filter__link', {
            selected: filter === FilterType.Active,
          })}
          onClick={() => {
            setFilter(FilterType.Active);
          }}
        >
          Active
        </NavLink>
        <NavLink
          data-cy="FilterLinkCompleted"
          to="/completed"
          className={classNames('filter__link', {
            selected: filter === FilterType.Completed,
          })}
          onClick={() => {
            setFilter(FilterType.Completed);
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

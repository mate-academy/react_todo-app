/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoContext } from './SetTodosContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { removeTodo } = todoContext;

  const { completed, title, id } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title.trim()}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => removeTodo(id)}
      >
        ×
      </button>
    </div>
  );
};

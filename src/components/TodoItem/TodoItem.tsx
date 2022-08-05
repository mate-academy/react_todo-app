/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onDeleteTodo: (todoId: number) => void,
  onChangeComplited: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo, onDeleteTodo, onChangeComplited,
}) => {
  return (
    <>
      <li
        className={classNames(
          { completed: todo.completed },
          { view: !todo.completed },
        )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-view${todo.id}`}
            onChange={() => onChangeComplited(todo.id)}
          />
          <label htmlFor={`toggle-view${todo.id}`}>
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => onDeleteTodo(todo.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    </>
  );
};

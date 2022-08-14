/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';

import './TodoItem.scss';

type Props = {
  todo: Todo,
  onChange: (value: boolean, todoId: number) => void,
  onDelete: (todoId: number) => void,
  onEdit: (value: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  onChange,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  // eslint-disable-next-line max-len
  const handleChange = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^\s*$/i;

    switch (event.key) {
      case 'Escape':
        setTodoTitle(todo.title);
        setIsEditing(false);
        break;

      case 'Enter':
        if (regex.test(todoTitle)) {
          return;
        }

        setIsEditing(false);
        setTodoTitle(todoTitle);
        onEdit(todoTitle, todo.id);

        break;

      default:
        break;
    }
  }, [todoTitle]);

  return (
    <li
      className={classNames({
        'completed ': todo.completed,
        'editing ': isEditing,
      })}
      onDoubleClick={() => {
        setIsEditing(!isEditing);
      }}
      onBlur={() => {
        setIsEditing(false);
        setTodoTitle(todoTitle);
        onEdit(todoTitle, todo.id);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => onChange(!todo.completed, todo.id)}
        />

        <label>{todoTitle}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit todo-input"
        value={todoTitle}
        ref={ref => ref?.focus()}
        onChange={(event) => {
          setTodoTitle(event.target.value);
        }}
        onKeyDown={handleChange}
      />
    </li>
  );
});

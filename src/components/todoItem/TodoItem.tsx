/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

import '../../styles/todo-list.css';
import '../../styles/index.css';

type Props = {
  todo: Todo;
  onEditTodo: (newTodo:Todo) => void;
  onMarkCompleteOneTodo: (todoId: number) => void;
  onTodoDelete:(todoId: number) => void;
};

export const TodoItem: React.FC<Props> = (
  {
    todo, onEditTodo, onMarkCompleteOneTodo, onTodoDelete,
  },
) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (event.detail === 2) {
      setIsEdited(true);
      setEditedValue(todo.title);
    } else {
      onMarkCompleteOneTodo(todo.id);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEdited,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id="toggle-view"
          onClick={() => {
            onMarkCompleteOneTodo(todo.id);
          }}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onTodoDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedValue}
        onChange={(event) => {
          setEditedValue(event.target.value);
        }}
        onBlur={() => {
          setIsEdited(false);
          const copyTodo = { ...todo };

          copyTodo.title = editedValue;
          onEditTodo(copyTodo);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            const copyTodo = { ...todo };

            copyTodo.title = editedValue;
            onEditTodo(copyTodo);
          }
        }}
      />
    </li>
  );
};

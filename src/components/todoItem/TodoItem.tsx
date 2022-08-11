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

  const handleDoubleClick = () => {
    setIsEdited(true);
    setEditedValue(todo.title);
  };

  const handleSubmitEditing = () => {
    if (editedValue.trim().length > 0) {
      const copyTodo = { ...todo };

      copyTodo.title = editedValue;
      onEditTodo(copyTodo);
    } else {
      onTodoDelete(todo.id);
    }

    setIsEdited(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEdited,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id="toggle-view"
          onChange={() => {
            onMarkCompleteOneTodo(todo.id);
          }}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onTodoDelete(todo.id);
          }}
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
          handleSubmitEditing();
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSubmitEditing();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsEdited(false);
            setEditedValue(todo.title);
          }
        }}
      />
    </li>
  );
};

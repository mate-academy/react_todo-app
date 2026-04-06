/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

interface Props {
  todo: Todo;
  onDeleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onDeleteTodo }) => {
  const { toggleTodo, updateTodo } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const handleSubmit = () => {
    updateTodo(todo.id, editingTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onBlur={handleSubmit}
            onChange={event => setEditingTitle(event.target.value)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                handleCancel();
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(true);
            setEditingTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDeleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};

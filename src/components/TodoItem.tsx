import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onHandleToggleComplete: (todoId: number) => void,
  onDeleteTodo: (todoId: number) => void,
  onPatchTodo: (todoId: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onHandleToggleComplete,
  onDeleteTodo,
  onPatchTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const handlePatchTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditingTitle(todo.title);
      setIsEditing(false);

      return;
    }

    if (e.key === 'Enter' && !editingTitle) {
      onDeleteTodo(todo.id);
      setIsEditing(false);

      return;
    }

    if (e.key === 'Enter') {
      onPatchTodo(todo.id, editingTitle);
      setIsEditing(false);
    }
  };

  const handleBlurInput = () => {
    if (!editingTitle) {
      onDeleteTodo(todo.id);
      setIsEditing(false);

      return;
    }

    if (editingTitle === todo.title) {
      return;
    }

    onPatchTodo(todo.id, editingTitle);
    setIsEditing(false);
  };

  return (
    <li className={classNames(
      { completed: todo.completed },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => onHandleToggleComplete(todo.id)}
        />

        <span onDoubleClick={() => setIsEditing(true)}>
          {editingTitle}
        </span>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="destroy-button"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>

      {isEditing && (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          className="edit"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onKeyDown={handlePatchTodo}
          onBlur={handleBlurInput}
        />
      )}
    </li>
  );
};

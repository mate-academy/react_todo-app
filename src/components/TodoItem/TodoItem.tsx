/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoEditForm } from '../TodoEditForm';
import { useTodosContext } from '../controllers/todos/useTodosContext';

enum EditKeyOfTodo {
  Title = 'title',
  Completed = 'completed',
}

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onDelete, onEdit } = useTodosContext();

  const titleFieldForm = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleFieldForm.current && isEditing) {
      titleFieldForm.current.focus();
    }
  }, [isEditing]);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo, EditKeyOfTodo.Completed, !todo.completed);
  };

  const handleSubmitForm = (value: string) => {
    if (value === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!value.trim()) {
      handleDelete();

      return;
    }

    try {
      onEdit(todo, EditKeyOfTodo.Title, value.trim());
      setIsEditing(false);
    } catch {
      setIsEditing(true);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleEdit}
        />
      </label>

      {isEditing ? (
        <div onKeyUp={({ key }) => key === 'Escape' && setIsEditing(false)}>
          <TodoEditForm
            title={todo.title}
            onSubmit={handleSubmitForm}
            titleFieldForm={titleFieldForm}
          />
        </div>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../type/Todo';

interface TodoItemProps {
  todo: Todo;
  editing: boolean;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  handleEditStart: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  cancelEditing: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editing,
  toggleTodo,
  removeTodo,
  handleEditStart,
  updateTodoTitle,
  cancelEditing,
}) => {
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && fieldRef.current) {
      fieldRef.current.focus();
      fieldRef.current.select();
    }
  }, [editing]);

  const save = () => {
    if (fieldRef.current) {
      updateTodoTitle(todo.id, fieldRef.current.value);
      cancelEditing();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          className="todo__status"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {editing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            save();
          }}
        >
          <input
            data-cy="TodoTitleField"
            ref={fieldRef}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            onBlur={save}
            onKeyDown={handleKeyDown}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEditStart(todo.id)}
          >
            {todo.title}
          </span>
          <button
            data-cy="TodoDelete"
            type="button"
            className="todo__remove"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
//new

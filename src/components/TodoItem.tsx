/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

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

  const save = () => {
    updateTodoTitle(todo.id, fieldRef.current?.value || '');
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
            onKeyUp={event => {
              if (event.key === 'Escape') {
                cancelEditing();
              }
            }}
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

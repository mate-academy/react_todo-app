import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { Todo } from '../Context';

type Props = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editingTodoId: string | null;
  setEditingTodoId: Dispatch<SetStateAction<string | null>>;
  redact: string;
  setRedact: Dispatch<SetStateAction<string>>;
  editInputRef: RefObject<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  handleSave: (id: string) => void;
  handleEditSubmit: (event: React.FormEvent, id: string) => void;
  cancelEditing: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  deleteTodo,
  editingTodoId,
  setEditingTodoId,
  redact,
  setRedact,
  editInputRef,
  inputRef,
  handleSave,
  handleEditSubmit,
  cancelEditing,
}) => {
  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={todo.completed ? 'todo completed' : 'todo'}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => {
            toggleTodo(todo.id);
          }}
        />
      </label>

      {editingTodoId === todo.id ? (
        <form onSubmit={event => handleEditSubmit(event, todo.id)}>
          <input
            ref={editInputRef}
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={redact}
            onChange={event => {
              setRedact(event.target.value);
            }}
            onBlur={() => handleSave(todo.id)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                cancelEditing();
              }
            }}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setRedact(todo.title);
            setEditingTodoId(todo.id);
          }}
        >
          {todo.title}
        </span>
      )}

      {editingTodoId !== todo.id && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => {
            deleteTodo(todo.id);
            inputRef.current?.focus();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

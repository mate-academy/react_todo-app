/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React, { useRef, useState } from 'react';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  deleteTodo: (todo: Todo) => void;
  markCompleted: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  markCompleted,
  todos,
  setTodos,
}) => {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleTitleChange(
    e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.FocusEvent<HTMLInputElement, Element>,
  ) {
    const trimmedTitle = (e.target as HTMLInputElement).value.trim();

    if (trimmedTitle === todo.title) {
      setEditing(false);

      return;
    }

    if (!trimmedTitle) {
      deleteTodo(todo);
      setEditing(false);

      return;
    }

    const result = todos.map(item =>
      item.id === todo.id ? { ...item, title: trimmedTitle } : item,
    );

    setTodos(result);
    setEditing(false);
  }

  function handlgeInputClick() {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function HandleKeyPressed(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleTitleChange(e);
    }

    if (e.key === 'Escape') {
      setEditing(false);
      setEditingValue(todo.title);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    if (e.target.value === todo.title) {
      setEditing(false);
    } else {
      handleTitleChange(e);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => markCompleted(todo)}
        />
      </label>

      {editing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
            onChange={e => setEditingValue(e.target.value)}
            onBlur={e => handleBlur(e)}
            onKeyDown={e => HandleKeyPressed(e)}
            value={editingValue}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handlgeInputClick()}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

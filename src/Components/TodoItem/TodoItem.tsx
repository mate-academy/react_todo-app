/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Todo } from "../../types/Todo";
import classNames from "classnames";
import { TodoContext } from "../TodoProvider/TodoProvider";

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);
  const { deleteTodo, updateTodo } = useContext(TodoContext);

  const todoTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoTitleRef.current) {
      todoTitleRef.current.focus();
    }
  }, [editing]);

  function handleUpdateTodo() {
    const trimmedEditTitle = editTitle.trim();

    if (trimmedEditTitle === "") {
      deleteTodo(todo.id);

      return;
    }

    if (trimmedEditTitle !== todo.title) {
      updateTodo({ ...todo, title: trimmedEditTitle });
      setEditTitle(trimmedEditTitle);
    }

    setEditing(false);
  }

  function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    updateTodo({ ...todo, completed: e.target.checked });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdateTodo();
  }

  function handleCancel(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setEditing(false);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames("todo", {
        completed: todo.completed,
      })}
      onDoubleClick={() => setEditing(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleChangeCheckbox}
        />
      </label>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will bee deleted"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleUpdateTodo}
            onKeyDown={handleCancel}
            autoFocus
            ref={todoTitleRef}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {editTitle}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

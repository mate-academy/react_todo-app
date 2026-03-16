/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */

import classNames from "classnames";
import { useTodos } from "../store/TodosContext";
import { TodoType } from "../types/TodoType";
import { useState } from "react";

export const Todo: React.FC<{ todo: TodoType }> = ({ todo }) => {
  const { toggleTodo, removeTodo, updateTitleTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);

  const handleSave = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedTitle = tempTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (trimmedTitle.length === 0) {
      removeTodo(todo.id);

      return;
    }

    updateTitleTodo(todo.id, trimmedTitle);
    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
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
        <form onSubmit={event => handleSave(event)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={tempTitle}
            onChange={event => setTempTitle(event.target.value)}
            onBlur={() => handleSave()}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setIsEditing(false);
                setTempTitle(todo.title);
              }
            }}
            autoFocus
          />
        </form>
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
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};



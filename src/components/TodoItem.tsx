import cn from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Todo, TodosContext } from "./TodosContext";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const { dispatch } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleRemoveItem = (todoId: number) => {
    dispatch({
      type: "removeItem",
      payload: {
        todoId,
      },
    });

    setIsEditing(false);
  };

  const handleCompletion = () => {
    dispatch({
      type: "updateItem",
      payload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleOnBlur = () => {
    const isEmpty = !editedTitle.trim();

    if (isEmpty) {
      handleRemoveItem(todo.id);
      setIsEditing(false);

      return;
    }

    dispatch({
      type: "updateItem",
      payload: {
        ...todo,
        title: editedTitle,
      },
    });

    setIsEditing(false);
  };

  const handleEditing = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOnBlur();
    }

    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(todo.title);
    }
  };

  return (
    <li
      className={cn({
        editing: isEditing,
        completed: todo.completed,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${todo.id}`}
          checked={todo.completed}
          onChange={handleCompletion}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleRemoveItem(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInputRef}
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onKeyUp={handleEditing}
        onBlur={handleOnBlur}
      />
    </li>
  );
};

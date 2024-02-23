import React, { useContext, useState } from "react";
import cn from "classnames";
import { TodosContext } from "../store";
import { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, removeTodo, editTodo } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleTodoCompleted = () =>
    setTodos(
      todos.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el,
      ),
    );

  const handleSave = () => {
    if (editTitle.trim().length === 0) {
      removeTodo(todo.id);
    } else if (editTitle.trim() !== "" && editTitle !== todo.title) {
      editTodo(todo.id, editTitle);
    } else {
      setEditTitle(todo.title);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <>
      <li
        className={cn({
          editing: isEditing,
          completed: todo.completed,
        })}
      >
        <div>
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            name="toggle-view"
            checked={todo.completed}
            onChange={handleTodoCompleted}
          />

          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
            />
          ) : (
            <>
              <label
                htmlFor="toggle-view"
                onDoubleClick={() => setIsEditing(true)}
              >
                {todo.title}
              </label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={() => removeTodo(todo.id)}
                aria-label="delete Todo"
              />
            </>
          )}
        </div>
      </li>
    </>
  );
};

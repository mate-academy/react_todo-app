import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { TodoContext } from "../TodoProvider/TodoProvider";

export const Header: React.FC = () => {
  const [title, setTitle] = useState("");
  const { todos, addTodo, handleToggleCheckboxes } = useContext(TodoContext);

  const newTodoFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newTodoFieldRef.current) {
      newTodoFieldRef.current.focus();
    }
  }, [todos]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle);
    setTitle("");
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames("todoapp__toggle-all", {
            active: todos.every((t) => t.completed),
          })}
          onClick={handleToggleCheckboxes}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={newTodoFieldRef}
        />
      </form>
    </header>
  );
};

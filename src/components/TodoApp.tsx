import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { TodosContext } from "../store";

import { TodoFilter } from "./TodoFilter";
import { TodoList } from "./TodoList";

export const TodoApp = () => {
  const { addTodo, todos } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState("");
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({
        id: nanoid(),
        title: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <TodoList />
          <TodoFilter />
        </>
      )}
    </div>
  );
};

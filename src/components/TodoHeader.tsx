import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { TodosContext } from "../store";

export const TodoHeader = () => {
  const { addTodo } = useContext(TodosContext);
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
  );
};

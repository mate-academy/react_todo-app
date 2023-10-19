/*eslint-disable*/
import React, { useContext, useState } from "react";
import { TodosContext } from "../../context/TodosContext";

export const Header: React.FC = () => {
  const [searchField, setSearchField] = useState("");

  const { saveTodo } = useContext(TodosContext);
  const onSaveTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchField) {
      return;
    }

    saveTodo(searchField);

    setSearchField("");
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSaveTodo}>
        <input
          value={searchField}
          onChange={(event) => setSearchField(event.target.value)}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

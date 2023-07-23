/*eslint-disable*/
import React, { useContext, useState } from "react";
import { TodosContext } from "../../TodosContext";
import { TodoList } from "../TodoList";

export const TodoApp: React.FC = () => {
  const { todos, saveTodo } = useContext(TodosContext);

  const [searchField, setSearchField] = useState("");

  const onSaveTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveTodo(searchField);

    setSearchField("");
  };

  return (
    <div className="todoapp">
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

      {todos.length > 0 && (
        <>
          {console.log(todos)}
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={todos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              3 items left
            </span>

            <ul className="filters">
              <li>
                <a href="#/" className="selected">
                  All
                </a>
              </li>

              <li>
                <a href="#/active">Active</a>
              </li>

              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>

            <button type="button" className="clear-completed">
              Clear completed
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

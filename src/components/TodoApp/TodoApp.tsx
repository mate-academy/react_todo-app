/*eslint-disable*/
import React, { useContext, useState, useCallback } from "react";
import { TodosContext } from "../../context/TodosContext";
import { TodoList } from "../TodoList";
import { Todo } from "../../types/Todo";
import { TodosFilter } from "../TodosFilter";
import { filterTodo } from "../../helpers/filterTodo";

export const TodoApp: React.FC = () => {
  const { todos, saveTodo, toggleAll, filterField, onClearCompleted } =
    useContext(TodosContext);

  const [searchField, setSearchField] = useState("");

  const onSaveTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveTodo(searchField);

    setSearchField("");
  };

  const countUnfinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => !todo)
        .length;
    },
    [todos]
  );

  const countFinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => todo)
        .length;
    },
    [todos]
  );

  const visibleTodos = filterTodo(todos, filterField);

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
            <label onClick={() => toggleAll()} htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList items={visibleTodos} />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {countUnfinished(todos)} items left
            </span>

            <TodosFilter />

            {countFinished(todos) ? (
              <button
                onClick={() => onClearCompleted()}
                type="button"
                className="clear-completed"
              >
                Clear completed
              </button>
            ) : (
              ""
            )}
          </footer>
        </>
      )}
    </div>
  );
};

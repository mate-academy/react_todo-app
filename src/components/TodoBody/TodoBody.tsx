/*eslint-disable*/
import React, { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { TodoList } from "../TodoList";
import { filterTodo } from "../../helpers/filterTodo";

export const TodoBody: React.FC = () => {
  const { toggleAll, todos, filterField } = useContext(TodosContext);

  const visibleTodos = filterTodo(todos, filterField);
  return (
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
  );
};

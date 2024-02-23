import { useContext, useState } from "react";
import { TodosContext } from "../store";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { todos, setTodos, filteredTodos } = useContext(TodosContext);
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: !toggleAll })));
    setToggleAll(!toggleAll);
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={toggleAll}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};

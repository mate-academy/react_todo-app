/* eslint-disable */
import { TodoItem } from "./TodoItem";
import { useTodosContext } from "../context/TodosContext";

export function TodoList() {
  const { sortedTodos } = useTodosContext();

  return (
    <ul className="todo-list" data-cy="todoList">
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

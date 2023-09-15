import { TodoItem } from "./TodoItem";
import { useTodosContext } from "../context/TodosContext";
import { FilterType } from "../types/todoTypes";
import { useFilterContext } from "../context/FilterContext";

export function TodoList() {
  const { todos } = useTodosContext();
  const { currentFilter } = useFilterContext();

  const sortedTodos = todos.filter((todo) => {
    if (currentFilter === FilterType.Completed) {
      return todo.completed;
    } else if (currentFilter === FilterType.Active) {
      return !todo.completed;
    }
    return true;
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

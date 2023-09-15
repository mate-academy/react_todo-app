import { TodoItem } from './TodoItem';
import { useTodosContext } from '../TodosContext';

export function TodoList() {
  const { todos } = useTodosContext();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

import { Todo } from '../types';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

export function TodoList({ todos, toggleTodo }: TodoListProps) {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}

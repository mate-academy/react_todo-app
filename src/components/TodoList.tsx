import { Todo } from '../TodoType';
import { TodoItem } from './TodoItem';

export type TodoListProps = {
  todos: Todo[]
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

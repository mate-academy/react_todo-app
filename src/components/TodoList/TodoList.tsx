import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodo,
  removeTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};

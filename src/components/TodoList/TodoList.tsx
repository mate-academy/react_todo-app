import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type TodoListProps = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
  onTodoUpdate: (todo: Todo, value: object) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoDelete,
  onTodoUpdate,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onButtonClick={onTodoDelete}
          onTodoUpdate={onTodoUpdate}
        />
      ))}
    </ul>
  );
};

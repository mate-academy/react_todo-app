import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onCompleted: (id: number) => void;
  onRenameTodo: (id: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDeleteTodo,
  onCompleted,
  onRenameTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onCompleted={onCompleted}
          onRenameTodo={onRenameTodo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

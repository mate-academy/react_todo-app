import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  onDelete?: (id: number) => void;
  onUpdate?: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

import { Todo } from './types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (newTitle: string, todoId: number) => void;
};

export const Todolist: React.FC<Props> = ({
  items,
  onDelete,
  onCheck,
  onEdit,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => (
        <TodoItem
          todo={todo}
          onDelete={onDelete}
          key={todo.id}
          onCheck={onCheck}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

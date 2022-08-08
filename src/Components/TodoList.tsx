import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[],
  toggleTodoStatus: (id: number) => void,
  onDeleteTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  items,
  toggleTodoStatus,
  onDeleteTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => (
        <TodoItem
          toggleTodoStatus={toggleTodoStatus}
          onDeleteTodo={onDeleteTodo}
          todo={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};

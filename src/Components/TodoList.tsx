import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[],
  toggleTodoStatus: (id: number) => void,
  deleteTodo: (id: number) => void,
  updateTitle: (id: number, title: string) => void
};

export const TodoList: React.FC<Props> = ({
  items,
  toggleTodoStatus,
  deleteTodo,
  updateTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => (
        <TodoItem
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
          updateTitle={updateTitle}
          todo={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};

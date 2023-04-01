import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number, status: boolean) => void;
  removeTodo: (id: number) => void;
  status: Status;
  onUpdateList: (id: number, key: string, value: string | boolean) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  removeTodo,
  status,
  onUpdateList,
}) => {
  const visibleTodos = todos.filter(item => {
    switch (status) {
      case Status.all:
        return item;

      case Status.completed:
        return item.completed;

      case Status.active:
        return !item.completed;

      default:
        return 0;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          onUpdateList={onUpdateList}
        />
      ))}
    </ul>
  );
};

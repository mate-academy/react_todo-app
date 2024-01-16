import { Todo } from '../../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[];
};
export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

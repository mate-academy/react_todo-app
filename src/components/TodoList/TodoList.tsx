import { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

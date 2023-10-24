import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[];
};
export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          id={todo.id}
        />
      ))}
    </ul>
  );
};

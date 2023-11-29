import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items && items.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

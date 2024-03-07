import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

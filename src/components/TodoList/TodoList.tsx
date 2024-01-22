import { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map((item) => {
        return (
          <TodoItem
            todo={item}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};

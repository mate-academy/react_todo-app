import { TodoItem } from './todoItem';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

import { Todo } from '../type/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  items: Todo[],
  onClick: (id: number) => void,
  editTodo: (value: string, id: number) => void;
};

export const TodoList = ({
  items,
  onClick,
  editTodo,
}: Props) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => {
        return (
          <TodoItem
            onClick={onClick}
            todo={todo}
            key={todo.id}
            editTodo={editTodo}
          />
        );
      })}
    </ul>
  );
};

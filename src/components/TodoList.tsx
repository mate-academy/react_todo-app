import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  items: Todo[]
};

export const TodoList = ({ items }: TodoListProps) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

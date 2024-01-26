import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => (
  <ul className="todo-list" data-cy="todosList">
    {items.map(todo => <TodoItem key={todo.id} todo={todo} />)}
  </ul>
);

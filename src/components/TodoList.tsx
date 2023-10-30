import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  editing: Todo | null,
  onEdit: (todo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  editing,
  onEdit,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editing={editing}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (v: number) => void;
  onUpdate: (v: Todo[]) => Promise<(Todo | void)[]>;
  loadingIds: number[];
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onUpdate,
  loadingIds,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          isLoading={loadingIds.includes(todo.id)}
          onUpdate={onUpdate}
        />
      ))}
    </section>
  );
};

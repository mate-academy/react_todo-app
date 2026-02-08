import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo';

type Props = {
  todos: (Todo & { temp?: boolean })[];
  toggleStatus: (value: number) => void;
  deleteTodo: (value: number) => void;
  renameTodo: (id: number, value: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleStatus,
  deleteTodo,
  renameTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleStatus={toggleStatus}
            deleteTodo={deleteTodo}
            renameTodo={renameTodo}
          />
        );
      })}
    </section>
  );
};

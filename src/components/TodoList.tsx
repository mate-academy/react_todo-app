import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onCheck: (t: Todo) => void;
  onDelete: (id: number) => void;
  onUpdate: (updTodo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onCheck,
  onDelete,
  onUpdate,
}) => {
  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map((todo: Todo) => (
          <TodoItem
            todo={todo}
            onCheckedChange={onCheck}
            onDeleteTodo={onDelete}
            onTextUpdate={onUpdate}
            key={todo.id}
          />
        ))}
      </section>
    </>
  );
};

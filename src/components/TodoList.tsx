import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onCheck: (t: Todo) => void;
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onCheck, onDelete }) => {
  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map((todo: Todo) => (
          <TodoItem
            todo={todo}
            onCheckedChange={onCheck}
            onDeleteTodo={onDelete}
            key={todo.id}
          />
        ))}
      </section>
    </>
  );
};

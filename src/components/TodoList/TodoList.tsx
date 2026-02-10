import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo';

type Props = {
  todos: (Todo & { temp?: boolean })[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};

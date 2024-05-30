import { Todo } from '../todoStorage';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};

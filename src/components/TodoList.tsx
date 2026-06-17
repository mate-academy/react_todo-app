import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

export const TodoList: React.FC<{
  visibleTodos: Todo[];
}> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

import { useTodos } from './services/ContextHook';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { visibleTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};

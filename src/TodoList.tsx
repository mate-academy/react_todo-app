import { TodoItem } from './TodoItem';
import { useTodos } from './TodosContext';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useTodos(); // if you have visibleTodos in context, use that instead

  if (visibleTodos.length === 0) {
    return null; // show only the input (in Header) when there are no todos
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

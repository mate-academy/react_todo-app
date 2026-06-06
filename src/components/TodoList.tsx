import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { preparedTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

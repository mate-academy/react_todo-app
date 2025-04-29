import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContextProvider';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { normalizedTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {normalizedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
}

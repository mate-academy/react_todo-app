import { useMemo } from 'react';
import { useStore } from '../../store';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const { todos, filter } = useStore();

  const filteredTodos = useMemo(() => {
    if (filter === 'all') {
      return todos;
    }

    return todos.filter(({ completed }) => {
      if (filter === 'completed') {
        return completed;
      }

      return !completed;
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

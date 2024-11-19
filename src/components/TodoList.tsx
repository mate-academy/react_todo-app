import { useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { useGlobalState } from '../Store';
import { SelectedFilter } from '../types/SelectedFilter';

export const TodoList = () => {
  const { todos, filter } = useGlobalState();

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case SelectedFilter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case SelectedFilter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

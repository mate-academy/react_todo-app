import { useMemo } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import { TodoItem } from './TodoItem';
import { filterTodos } from '../helpers/filterTodos';

export const TodoList = () => {
  const { todos, filterBy } = useTodosContext();

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filterBy);
  }, [todos, filterBy]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

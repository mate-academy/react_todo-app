import { useMemo } from 'react';
import { useGlobalState } from '../../GlobalProvider';
import { TodoItem } from '../TodoItem';
import { filterTodos } from '../../utils/filterTodos';

export const TodoList = () => {
  const { todos, filter } = useGlobalState();

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [filter, todos],
  );

  if (!todos.length) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

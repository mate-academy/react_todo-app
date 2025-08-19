import React, { useMemo } from 'react';
import { useTodos } from '../context/TodosContext';
import { TodoItem } from './TodoItem';
import type { Filter } from '../hooks/useHashFilter';

export const TodoList: React.FC<{ filter: Filter }> = ({ filter }) => {
  const { todos } = useTodos();

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
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

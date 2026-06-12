import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  // Відбираємо тільки ті справи, які підходять під поточний фільтр
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed; // Тільки невиконані
    }

    if (filter === 'completed') {
      return todo.completed; // Тільки виконані
    }

    return true; // Якщо фільтр 'all' — показуємо всі
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* Малюємо вже ВІДФІЛЬТРОВАНИЙ масив */}
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

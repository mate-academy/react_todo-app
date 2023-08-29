import React from 'react';
import { useTodos } from '../TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter, setTodos } = useTodos();

  const filteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    // Оновлюємо статус всіх todo в залежності від поточного стану
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <>
      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {filteredTodos().map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

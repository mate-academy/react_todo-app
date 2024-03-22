import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import { useTodos } from '../../TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useTodos();

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  const handleToggleAll = () => {
    setTodos(prevTodos => {
      const allCompleted = prevTodos.every(todo => todo.completed);
      const updatedTodos = prevTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

      return updatedTodos;
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.length > 0 && remainingTodos === 0}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};

import React from 'react';
import { TodoList } from '../TodoList/TodoList';
import { useTodos } from '../../TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useTodos();

  const remainingTodos = todos.filter(todo => !todo.completed).length;

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
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

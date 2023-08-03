import React from 'react';
import { TodoList } from '../TodoList';
import { useTodo } from '../../context/TodosContext';

export const Main = () => {
  const { todos, setTodos } = useTodo();

  const toggleAll = () => {
    const allComplete = todos.every(todo => todo.completed);

    const newTodos = todos.map((todo) => ({
      ...todo,
      completed: !allComplete,
    }));

    setTodos(newTodos);
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />
        </>
      )}

    </section>
  );
};

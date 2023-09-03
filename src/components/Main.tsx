import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';
import { useTodos } from '../hooks/useTodo';

export const Main: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [allCompleted, setAllComleted] = useState(true);

  const toggleTodosActive = () => {
    if (todos.length) {
      const completedTodos: Todo[] = todos.map(todo => {
        return { ...todo, completed: allCompleted };
      });

      setTodos(completedTodos);

      setAllComleted(!allCompleted);
    }
  };

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={() => toggleTodosActive()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      {!!todos.length && <TodoList />}
    </section>
  );
};

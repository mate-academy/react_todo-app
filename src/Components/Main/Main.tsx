import React, { useState } from 'react';
import { useTodos, useTodosDispatch } from '../TodoContext/TodoContext';
import { TodoList } from '../TodoList/TodoList';
import { State } from '../../types/State';

export const Main: React.FC = () => {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const [isToggleAll, setIsToggleAll] = useState(false);

  const handleToggleAll = () => {
    const completed = !isToggleAll;

    dispatch({ type: State.TOGGLE_ALL, completed });
    setIsToggleAll(completed);
  };

  const allCompleted = todos.every((todo) => todo.completed);

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <TodoList />
    </section>
  );
};

import React, { useContext } from 'react';
import { TodoList } from './TodoList';
import { dispatchContext, stateContext } from '../manage/TodoContext';

export const Main: React.FC = () => {
  const { todos } = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    dispatch({
      type: 'toggleCompleted',
      payload: !allCompleted,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allCompleted}
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
